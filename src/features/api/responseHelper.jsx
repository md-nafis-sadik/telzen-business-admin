const defaultError = {
  data: null,
  error: {
    status: 500,
    timestamp: new Date().toISOString(),
  },
  message: "An unexpected error occurred.",
};

export const responseHelper = async (response) => {
  try {
    // Handle single response object
    if (
      typeof response === "object" &&
      !Array.isArray(response) &&
      response !== null
    ) {
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = {
            status: response.status,
            statusText: response.statusText,
            message: `HTTP ${response.status}: ${response.statusText}`,
            timestamp: new Date().toISOString(),
          };
        }
        return {
          error: {
            ...defaultError.error,
            ...errorData,
            status: response.status,
            timestamp: new Date().toISOString(),
          },
          data: null,
        };
      }

      const data = await response.json();
      return {
        ...(data || {}),
        error: null,
        timestamp: new Date().toISOString(),
      };
    }
    // Handle array of responses
    else if (Array.isArray(response) && response.length > 0) {
      // Check if any response has an error
      const errorItem = response.find((item) => !item.ok);

      if (errorItem) {
        let errorData;
        try {
          errorData = await errorItem.json();
        } catch {
          errorData = {
            status: errorItem.status,
            statusText: errorItem.statusText,
            message: `HTTP ${errorItem.status}: ${errorItem.statusText}`,
            timestamp: new Date().toISOString(),
          };
        }
        return {
          error: {
            ...defaultError.error,
            ...errorData,
            status: errorItem.status,
            timestamp: new Date().toISOString(),
          },
          data: null,
        };
      }

      // Success case for array - process all responses
      const allData = await Promise.all(
        response.map(async (item) => {
          try {
            return await item.json();
          } catch (error) {
            throw new Error(
              `Failed to parse JSON for response with status ${item.status}`
            );
          }
        })
      );
      return {
        data: allData,
        error: null,
      };
    }

    // Handle invalid input
    return {
      error: {
        ...defaultError.error,
        message:
          "Invalid input: Expected Response object or array of Response objects",
      },
      data: null,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      error: {
        ...defaultError.error,
        message: `Failed to process response: ${error.message}`,

        originalError: error.name,
      },
      data: null,
      timestamp: new Date().toISOString(),
    };
  }
};
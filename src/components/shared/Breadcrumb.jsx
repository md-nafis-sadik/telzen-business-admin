import { useLocation } from "react-router-dom";
import { adminRouteLinks } from "@/services";

function Breadcrumb() {
  const location = useLocation();
  const pathname = location.pathname;

  // Create breadcrumb items based on current path
  const generateBreadcrumbs = () => {
    const breadcrumbs = [];

    // Handle dashboard route - return empty breadcrumbs
    if (
      pathname === "/admin/dashboard" ||
      pathname === "/admin" ||
      pathname === "/"
    ) {
      breadcrumbs.push({
        name: " ",
        isActive: true,
      });
      return breadcrumbs;
    }

    // Special handling for staff routes (active/blocked/details)

    // Check for group details route first (more specific)
    if (pathname.match(/\/my-esim\/group\/[^/]+$/)) {
      breadcrumbs.push({
        name: "My eSIM",
        isActive: false,
      });
      breadcrumbs.push({
        name: "Group",
        isActive: false,
      });
      breadcrumbs.push({
        name: "Details",
        isActive: true,
      });
      return breadcrumbs;
    }

    if (pathname.includes("/my-esim/regular")) {
      breadcrumbs.push({
        name: "My eSIM",
        isActive: false,
      });
      breadcrumbs.push({
        name: "Regular",
        isActive: true,
      });
      return breadcrumbs;
    }

    if (pathname.includes("/my-esim/group") && !pathname.includes("/group/")) {
      breadcrumbs.push({
        name: "My eSIM",
        isActive: false,
      });
      breadcrumbs.push({
        name: "Group",
        isActive: true,
      });
      return breadcrumbs;
    }

    if (pathname.includes("/inventory/packages")) {
      breadcrumbs.push({
        name: "Inventory",
        isActive: false,
      });
      breadcrumbs.push({
        name: "Packages",
        isActive: true,
      });
      return breadcrumbs;
    }

    // Handle user group details route - FIXED
    if (pathname.match(/\/users\/active\/group\/[^/]+$/)) {
      breadcrumbs.push({
        name: "Group",
        isActive: false,
      });
      breadcrumbs.push({
        name: "Users",
        isActive: true,
      });
      return breadcrumbs;
    }

    if (pathname.match(/\/users\/blocked\/group\/[^/]+$/)) {
      breadcrumbs.push({
        name: "Group",
        isActive: false,
      });
      breadcrumbs.push({
        name: "Users",
        isActive: true,
      });
      return breadcrumbs;
    }

    // Handle active users route (without group)
    if (pathname === "/admin/users/active" || pathname === "/users/active") {
      breadcrumbs.push({
        name: "Users",
        isActive: false,
      });
      breadcrumbs.push({
        name: "Active",
        isActive: true,
      });
      return breadcrumbs;
    }

    // Handle blocked users route
    if (pathname === "/admin/users/blocked" || pathname === "/users/blocked") {
      breadcrumbs.push({
        name: "Users",
        isActive: false,
      });
      breadcrumbs.push({
        name: "Blocked",
        isActive: true,
      });
      return breadcrumbs;
    }

    if (pathname.includes("/inventory/checkout")) {
      breadcrumbs.push({
        name: "Inventory",
        isActive: false,
      });
      breadcrumbs.push({
        name: "Packages",
        isActive: false,
      });
      breadcrumbs.push({
        name: "Checkout",
        isActive: true,
      });
      return breadcrumbs;
    }

    // Find exact matching route first
    let currentRoute = Object.values(adminRouteLinks).find((route) => {
      return pathname === route.path;
    });

    // If no exact match, try pattern matching for dynamic routes
    if (!currentRoute) {
      currentRoute = Object.values(adminRouteLinks).find((route) => {
        // Handle dynamic routes with parameters (e.g., /admin/brick-list/edit/123)
        const routePattern = route.path.replace(/:id/g, "[^/]+");
        const regex = new RegExp(`^${routePattern}$`);
        return regex.test(pathname);
      });
    }

    if (currentRoute) {
      // Handle different route patterns
      if (pathname.includes("/add")) {
        // For add routes like /admin/brick-field/add
        const parentRouteName = currentRoute.activePath;
        const parentRoute = Object.values(adminRouteLinks).find(
          (route) =>
            route.activePath === parentRouteName &&
            !route.path.includes("/add") &&
            !route.path.includes("/edit") &&
            !route.path.includes("/active") &&
            !route.path.includes("/blocked"),
        );

        if (parentRoute) {
          breadcrumbs.push({
            name: parentRoute.name,
            isActive: false,
          });
        }
        breadcrumbs.push({
          name: "Add New",
          isActive: true,
        });
      } else if (pathname.includes("/edit")) {
        // For edit routes like /admin/brick-field/edit/123
        const parentRouteName = currentRoute.activePath;
        const parentRoute = Object.values(adminRouteLinks).find(
          (route) =>
            route.activePath === parentRouteName &&
            !route.path.includes("/add") &&
            !route.path.includes("/edit") &&
            !route.path.includes("/active") &&
            !route.path.includes("/blocked"),
        );

        if (parentRoute) {
          breadcrumbs.push({
            name: parentRoute.name,
            isActive: false,
          });
        }
        breadcrumbs.push({
          name: "Edit",
          isActive: true,
        });
      } else {
        // For main routes like /admin/brick-field, /admin/dashboard, etc.
        breadcrumbs.push({
          name: currentRoute.name,
          isActive: true,
        });
      }
    } else {
      // Fallback for unmatched routes
      const pathSegments = pathname
        .split("/")
        .filter((segment) => segment !== "");
      pathSegments.forEach((segment, index) => {
        if (segment !== "super-admin" && segment !== "admin") {
          let name = segment
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          // Handle specific cases
          if (name === "Brick List") {
            name = "Brick List";
          } else if (name === "Brick Field") {
            name = "Brick Field";
          }

          breadcrumbs.push({
            name,
            isActive: index === pathSegments.length - 1,
          });
        }
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (
    breadcrumbs.length === 0 ||
    (breadcrumbs.length === 1 && breadcrumbs[0].name === "")
  ) {
    return null;
  }

  return (
    <div className="text-base hidden items-center md:flex font-semibold">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={index} className="flex items-center gap-1">
          <span
            className={
              breadcrumb.isActive
                ? "font-medium text-text-900"
                : "text-text-500"
            }
          >
            {breadcrumb.name}
          </span>
          {index < breadcrumbs.length - 1 && (
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M4.34066 10.8333H13.649L9.58232 14.8999C9.25732 15.2249 9.25732 15.7583 9.58232 16.0833C9.90732 16.4083 10.4323 16.4083 10.7573 16.0833L16.249 10.5916C16.574 10.2666 16.574 9.7416 16.249 9.4166L10.7657 3.9166C10.4407 3.5916 9.91566 3.5916 9.59066 3.9166C9.26566 4.2416 9.26566 4.7666 9.59066 5.0916L13.649 9.1666H4.34066C3.88232 9.1666 3.50732 9.5416 3.50732 9.99994C3.50732 10.4583 3.88232 10.8333 4.34066 10.8333Z"
                  fill="#9E9E9E"
                />
              </svg>
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default Breadcrumb;

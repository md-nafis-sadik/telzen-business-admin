import RequestLoader from "@/components/shared/RequestLoader";
import { CopyIconSvg } from "@/services";
import { useApiSettings } from "@/hooks";

function ApiSettings() {
  const {
    apiKeys,
    hasKeys,
    isGenerating,
    maskKey,
    handleCopy,
    handleGenerateApi,
    handleRevokeApiKeys,
  } = useApiSettings();

  return (
    <section className="w-full flex-1 flex flex-col overflow-auto rounded-2xl">
      <div className="w-full bg-white rounded-2xl p-6">
        <div className="w-full">
          {/* Header */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-text-700">API Keys</h2>
            <p className="text-sm text-gray-600">
              Authenticate API requests by the keys given bellow.
            </p>
          </div>

          {/* API Keys Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-4">
            {/* AccessCode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                AccessCode
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={maskKey(apiKeys.accessCode)}
                  readOnly
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 cursor-default"
                />
                <button
                  type="button"
                  onClick={() => handleCopy(apiKeys.accessCode, "AccessCode")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded transition-colors"
                  disabled={!hasKeys}
                >
                  <CopyIconSvg />
                </button>
              </div>
            </div>

            {/* SecretKey */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SecretKey
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={maskKey(apiKeys.secretKey)}
                  readOnly
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 cursor-default"
                />
                <button
                  type="button"
                  onClick={() => handleCopy(apiKeys.secretKey, "SecretKey")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded transition-colors"
                  disabled={!hasKeys}
                >
                  <CopyIconSvg />
                </button>
              </div>
            </div>
          </div>

          {/* API Documentation Link */}
          <div className="mb-6">
            <p className="text-base text-text-700 font-semibold">
              API Documentation-{" "}
              <a
                href="https://docs.esimaccess.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-700 underline hover:text-text-950 transition-colors"
              >
                https://docs.esimaccess.com
              </a>
            </p>
          </div>

          {/* Action Button */}
          <div>
            {!hasKeys ? (
              <button
                type="button"
                onClick={handleGenerateApi}
                disabled={isGenerating}
                className="btn_save"
              >
                {isGenerating ? "GENERATING..." : "GENERATE API"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleRevokeApiKeys}
                disabled={isGenerating}
                className="btn_save"
              >
                {isGenerating ? "REVOKING..." : "REVOKE API KEYS"}
              </button>
            )}
          </div>
        </div>
      </div>
      {isGenerating && <RequestLoader />}
    </section>
  );
}

export default ApiSettings;

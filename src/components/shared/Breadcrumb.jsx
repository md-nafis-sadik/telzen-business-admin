import { useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
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
        name: "",
        isActive: true,
      });
      return breadcrumbs;
    }

    // Special handling for staff routes (active/blocked/details)
    if (pathname.includes("/staffs/active")) {
      breadcrumbs.push({
        name: "My Staff",
        isActive: false,
      });
      breadcrumbs.push({
        name: "Active",
        isActive: true,
      });
      return breadcrumbs;
    }

    if (pathname.includes("/staffs/blocked")) {
      breadcrumbs.push({
        name: "My Staff",
        isActive: false,
      });
      breadcrumbs.push({
        name: "Blocked",
        isActive: true,
      });
      return breadcrumbs;
    }

    if (pathname.includes("/staffs/details")) {
      breadcrumbs.push({
        name: "My Staff",
        isActive: false,
      });
      breadcrumbs.push({
        name: "Staffs Details",
        isActive: true,
      });
      return breadcrumbs;
    }

    // Handle customer routes
    if (pathname.includes("/customers/pending")) {
      breadcrumbs.push({
        name: "Customers",
        isActive: false,
      });
      breadcrumbs.push({
        name: "Pending",
        isActive: true,
      });
      return breadcrumbs;
    }

    if (pathname.includes("/customers/active")) {
      breadcrumbs.push({
        name: "Customers",
        isActive: false,
      });
      breadcrumbs.push({
        name: "Active",
        isActive: true,
      });
      return breadcrumbs;
    }

    if (pathname.includes("/customers/blocked")) {
      breadcrumbs.push({
        name: "Customers",
        isActive: false,
      });
      breadcrumbs.push({
        name: "Blocked",
        isActive: true,
      });
      return breadcrumbs;
    }

    if (pathname.includes("/customers/rejected")) {
      breadcrumbs.push({
        name: "Customers",
        isActive: false,
      });
      breadcrumbs.push({
        name: "Rejected",
        isActive: true,
      });
      return breadcrumbs;
    }

    // Handle order routes
    if (pathname.includes("/orders/pending")) {
      breadcrumbs.push({
        name: "Orders",
        isActive: false,
      });
      breadcrumbs.push({
        name: "Pending",
        isActive: true,
      });
      return breadcrumbs;
    }

    if (pathname.includes("/orders/validation")) {
      breadcrumbs.push({
        name: "Orders",
        isActive: false,
      });
      breadcrumbs.push({
        name: "Validation",
        isActive: true,
      });
      return breadcrumbs;
    }

    if (pathname.includes("/orders/processing")) {
      breadcrumbs.push({
        name: "Orders",
        isActive: false,
      });
      breadcrumbs.push({
        name: "Processing",
        isActive: true,
      });
      return breadcrumbs;
    }

    if (pathname.includes("/orders/completed")) {
      breadcrumbs.push({
        name: "Orders",
        isActive: false,
      });
      breadcrumbs.push({
        name: "Completed",
        isActive: true,
      });
      return breadcrumbs;
    }

    if (pathname.includes("/orders/cancelled")) {
      breadcrumbs.push({
        name: "Orders",
        isActive: false,
      });
      breadcrumbs.push({
        name: "Cancelled",
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
            !route.path.includes("/blocked")
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
            !route.path.includes("/blocked")
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
      } else if (pathname.includes("/staffs/add")) {
        // Special case for staff add
        breadcrumbs.push({
          name: "My Staff",
          isActive: false,
        });
        breadcrumbs.push({
          name: "Add New",
          isActive: true,
        });
      } else if (pathname.includes("/staffs/edit")) {
        // Special case for staff edit
        breadcrumbs.push({
          name: "My Staff",
          isActive: false,
        });
        breadcrumbs.push({
          name: "Edit",
          isActive: true,
        });
      } else if (pathname.includes("/customers/add")) {
        // Special case for customer add
        breadcrumbs.push({
          name: "All Customer",
          isActive: false,
        });
        breadcrumbs.push({
          name: "Add New",
          isActive: true,
        });
      } else if (pathname.includes("/customers/edit")) {
        // Special case for customer edit
        breadcrumbs.push({
          name: "All Customer",
          isActive: false,
        });
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
        if (segment !== "admin") {
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

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <div className="text-lg hidden items-center md:flex">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={index} className="flex items-center">
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
            <ChevronRight className="h-4 mx-1 text-gray-500" />
          )}
        </div>
      ))}
    </div>
  );
}

export default Breadcrumb;

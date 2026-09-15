import _ from "lodash";
import { Fragment } from "react";
import { Link } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@shadcnComponent/breadcrumb";

export default function ScreenHeader({ breadcrumbs = [], title, subtitle, action }) {
  return (
    <header className="relative border-b border-black/15 pb-6 sm:pb-8">
      {!_.isEmpty(breadcrumbs) && (
        <Breadcrumb className="mb-4">
          <BreadcrumbList className="gap-0 text-xs font-medium tracking-wide sm:gap-0">
            {_.map(breadcrumbs, ({ label, route }, index) => {
              const isCurrentPage = index === breadcrumbs.length - 1;

              return (
                <Fragment key={`${label}-${index}`}>
                  <BreadcrumbItem>
                    {isCurrentPage ? (
                      <BreadcrumbPage className="font-semibold text-muted-foreground">
                        {label}
                      </BreadcrumbPage>
                    ) : route ? (
                      <BreadcrumbLink asChild>
                        <Link to={route}>{label}</Link>
                      </BreadcrumbLink>
                    ) : (
                      <span>{label}</span>
                    )}
                  </BreadcrumbItem>
                  {!isCurrentPage && (
                    <BreadcrumbSeparator className="px-1">/</BreadcrumbSeparator>
                  )}
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      )}

      <div className="flex items-start justify-between gap-3 sm:items-center sm:gap-6">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold tracking-[-0.025em] sm:text-2xl lg:text-3xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1.5 max-w-2xl text-sm leading-5 text-muted-foreground sm:mt-2 sm:text-base sm:leading-6">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>

      <span className="absolute -bottom-px left-0 h-0.5 w-12 bg-accent" aria-hidden="true" />
    </header>
  );
}

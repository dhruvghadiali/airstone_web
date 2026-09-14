import { useRef, useState } from "react";
import _ from "lodash";
import { Check, ChevronsUpDown, LoaderCircle } from "lucide-react";
import { Button } from "@shadcnComponent/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@shadcnComponent/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shadcnComponent/popover";
import { cn } from "@lib/utils";

export default function FormDropdown({
  options = [],
  value,
  defaultValue = "",
  onValueChange,
  onBlur,
  placeholder = "Select an option",
  search = false,
  searchPlaceholder = "Search options...",
  emptyMessage = "No options found.",
  searchMode = "local",
  onSearch,
  isLoading = false,
  disabled = false,
  label,
  id,
  name,
  error,
  className,
}) {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [searchValue, setSearchValue] = useState("");
  const selectedValue = value === undefined ? internalValue : value;
  const selectedOption = _.find(
    options,
    (option) => _.toString(option.value) === _.toString(selectedValue),
  );
  const dropdownId = id ?? name;
  const errorId = error && dropdownId ? `${dropdownId}-error` : undefined;

  const handleOpenChange = (nextOpen) => {
    const wasOpen = openRef.current;
    openRef.current = nextOpen;
    setOpen(nextOpen);

    if (wasOpen && !nextOpen) {
      setSearchValue("");
      onBlur?.();
    }
  };

  const handleSelect = async (option) => {
    const isSelected = _.toString(option.value) === _.toString(selectedValue);
    const nextValue = isSelected ? "" : option.value;

    if (value === undefined) {
      setInternalValue(nextValue);
    }

    openRef.current = false;
    setOpen(false);
    setSearchValue("");

    try {
      await onValueChange?.(nextValue, nextValue ? option : null);
    } finally {
      onBlur?.();
    }
  };

  const handleSearchChange = (nextSearchValue) => {
    setSearchValue(nextSearchValue);
    onSearch?.(nextSearchValue);
  };

  return (
    <div className={className}>
      {label && (
        <label className="mb-2 block text-sm font-medium" htmlFor={dropdownId}>
          {label}
        </label>
      )}
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            id={dropdownId}
            name={name}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-invalid={Boolean(error)}
            aria-describedby={errorId}
            disabled={disabled}
            onBlur={(event) => {
              if (!openRef.current) {
                onBlur?.(event);
              }
            }}
            className={cn(
              "h-12 w-full justify-between rounded-xl border-black/15 bg-white/50 px-4 font-normal shadow-none hover:bg-white/70 hover:text-[#292d27]",
              !selectedOption && "text-muted-foreground",
              error && "border-red-600",
            )}
          >
            <span className="truncate">
              {selectedOption?.label ?? placeholder}
            </span>
            <ChevronsUpDown className="opacity-50" aria-hidden="true" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-(--radix-popover-trigger-width) border-black/10 bg-white p-0 text-[#292d27] shadow-xl"
          align="start"
        >
          <Command
            className="bg-white text-[#292d27]"
            shouldFilter={searchMode !== "remote"}
          >
            {search && (
              <CommandInput
                value={searchValue}
                onValueChange={handleSearchChange}
                placeholder={searchPlaceholder}
              />
            )}
            <CommandList>
              {isLoading ? (
                <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
                  <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                  Loading options...
                </div>
              ) : (
                <>
                  <CommandEmpty>{emptyMessage}</CommandEmpty>
                  <CommandGroup>
                    {_.map(options, (option) => (
                      <CommandItem
                        key={option.value}
                        value={_.toString(option.value)}
                        keywords={[option.label]}
                        disabled={option.disabled}
                        onSelect={() => handleSelect(option)}
                        className="rounded-lg px-3 py-2.5 data-[selected=true]:bg-background data-[selected=true]:text-[#292d27]"
                      >
                        <Check
                          className={cn(
                            "mr-2 size-4",
                            _.toString(selectedValue) === _.toString(option.value)
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                          aria-hidden="true"
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {error && (
        <p className="mt-1.5 text-sm text-red-700" id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

"use client";

import {
  ArrowUpRightIcon,
  BookIcon,
  BriefcaseIcon,
  DownloadIcon,
  HomeIcon,
  MailIcon,
  PencilIcon,
  PhoneIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import * as React from "react";
import { useRouter } from "next/navigation";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { searchContent } from "@/app/_actions/search-function";

// Define types for search results
type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
};

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  description: string;
};

type SearchResults = {
  results: {
    projects: Project[];
    blogPosts: BlogPost[];
  };
  pagination: {
    projects: { total: number };
    blogPosts: { total: number };
    combined: { total: number };
  };
  query: string;
};

export default function Search() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchResults | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Handle keyboard shortcut to open search
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Fetch search results when query changes
  React.useEffect(() => {
    const fetchResults = async () => {
      if (query.length < 3) {
        setResults(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const searchResults = await searchContent(query, 1, 5);

        if ("error" in searchResults) {
          setError(searchResults.error ?? "Unknown error");
          setResults(null);
        } else {
          setResults(searchResults as SearchResults);
        }
      } catch {
        setError("Failed to fetch search results");
        setResults(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Use debounce to avoid too many requests
    const timeoutId = setTimeout(fetchResults, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  // Handle input change
  const handleInputChange = (value: string) => {
    setQuery(value);
  };

  // Reset search when dialog closes
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      setQuery("");
      setResults(null);
    }
  };

  // Navigate and close modal
  const navigateTo = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <>
      <button
        type="button"
        className="border-input bg-secondary/75 text-muted-foreground placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-9 w-fit rounded-md border px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
        onClick={() => setOpen(true)}
      >
        <span className="flex grow items-center">
          <SearchIcon
            className="text-muted-foreground/80 -ms-1 me-3"
            size={16}
            aria-hidden="true"
          />
          <span className="text-muted-foreground/70 font-normal">Search</span>
        </span>
        <kbd className="bg-background text-muted-foreground/70 ms-12 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
          ⌘K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={handleOpenChange}>
        <CommandInput
          placeholder="Search projects, blogs, or type a command..."
          value={query}
          onValueChange={handleInputChange}
        />
        <CommandList>
          {isLoading && <CommandEmpty>Searching...</CommandEmpty>}

          {error && <CommandEmpty>Error: {error}</CommandEmpty>}

          {!isLoading && !error && query.length < 3 ? (
            // Show default commands when query is short
            <>
              <CommandGroup heading="Quick start">
                <CommandItem onSelect={() => navigateTo("/dashboard/projects")}>
                  <BriefcaseIcon
                    size={16}
                    className="opacity-60 mr-2"
                    aria-hidden="true"
                  />
                  <span>Add new project</span>
                </CommandItem>
                <CommandItem onSelect={() => navigateTo("/dashboard/blog")}>
                  <PencilIcon
                    size={16}
                    className="opacity-60 mr-2"
                    aria-hidden="true"
                  />
                  <span>Write blog post</span>
                </CommandItem>
                <CommandItem onSelect={() => navigateTo("/contact")}>
                  <MailIcon
                    size={16}
                    className="opacity-60 mr-2"
                    aria-hidden="true"
                  />
                  <span>Contact me</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    setOpen(false);
                    window.open("/resume.pdf", "_blank");
                  }}
                >
                  <DownloadIcon
                    size={16}
                    className="opacity-60 mr-2"
                    aria-hidden="true"
                  />
                  <span>Download resume</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Navigation">
                <CommandItem onSelect={() => navigateTo("/")}>
                  <HomeIcon
                    size={16}
                    className="opacity-60 mr-2"
                    aria-hidden="true"
                  />
                  <span>Home</span>
                </CommandItem>
                <CommandItem onSelect={() => navigateTo("/projects")}>
                  <BriefcaseIcon
                    size={16}
                    className="opacity-60 mr-2"
                    aria-hidden="true"
                  />
                  <span>Projects</span>
                </CommandItem>
                <CommandItem onSelect={() => navigateTo("/blog")}>
                  <BookIcon
                    size={16}
                    className="opacity-60 mr-2"
                    aria-hidden="true"
                  />
                  <span>Blog</span>
                </CommandItem>
                <CommandItem onSelect={() => navigateTo("/about")}>
                  <UserIcon
                    size={16}
                    className="opacity-60 mr-2"
                    aria-hidden="true"
                  />
                  <span>About me</span>
                </CommandItem>
                <CommandItem onSelect={() => navigateTo("/contact")}>
                  <PhoneIcon
                    size={16}
                    className="opacity-60 mr-2"
                    aria-hidden="true"
                  />
                  <span>Contact</span>
                </CommandItem>
              </CommandGroup>
            </>
          ) : (
            // Show search results when query is long enough
            <>
              {results && (
                <>
                  {results.results.projects.length === 0 &&
                    results.results.blogPosts.length === 0 && (
                      <CommandEmpty>
                        No results found for &quot;{query}&quot;
                      </CommandEmpty>
                    )}

                  {results.results.projects.length > 0 && (
                    <CommandGroup
                      heading={`Projects (${results.pagination.projects.total})`}
                    >
                      {results.results.projects.map((project) => (
                        <CommandItem
                          key={project.id}
                          value={project.title}
                          onSelect={() =>
                            navigateTo(`/projects/${project.slug}`)
                          }
                        >
                          <BriefcaseIcon
                            size={16}
                            className="opacity-60 mr-2"
                            aria-hidden="true"
                          />
                          <div className="flex flex-col">
                            <span>{project.title}</span>
                            {project.description && (
                              <span className="text-xs text-muted-foreground line-clamp-1">
                                {project.description}
                              </span>
                            )}
                          </div>
                        </CommandItem>
                      ))}
                      {results.pagination.projects.total >
                        results.results.projects.length && (
                        <CommandItem
                          onSelect={() =>
                            navigateTo(
                              `/search?q=${encodeURIComponent(query)}&type=projects`
                            )
                          }
                        >
                          <ArrowUpRightIcon size={16} className="mr-2" />
                          View all {results.pagination.projects.total} projects
                        </CommandItem>
                      )}
                    </CommandGroup>
                  )}

                  {results.results.blogPosts.length > 0 && (
                    <>
                      {results.results.projects.length > 0 && (
                        <CommandSeparator />
                      )}
                      <CommandGroup
                        heading={`Blog Posts (${results.pagination.blogPosts.total})`}
                      >
                        {results.results.blogPosts.map((post) => (
                          <CommandItem
                            key={post.id}
                            value={post.title}
                            onSelect={() => navigateTo(`/blog/${post.slug}`)}
                          >
                            <BookIcon
                              size={16}
                              className="opacity-60 mr-2"
                              aria-hidden="true"
                            />
                            <div className="flex flex-col">
                              <span>{post.title}</span>
                              {post.description && (
                                <span className="text-xs text-muted-foreground line-clamp-1">
                                  {post.description}
                                </span>
                              )}
                            </div>
                          </CommandItem>
                        ))}
                        {results.pagination.blogPosts.total >
                          results.results.blogPosts.length && (
                          <CommandItem
                            onSelect={() =>
                              navigateTo(
                                `/search?q=${encodeURIComponent(query)}&type=blog`
                              )
                            }
                          >
                            <ArrowUpRightIcon size={16} className="mr-2" />
                            View all {results.pagination.blogPosts.total} blog
                            posts
                          </CommandItem>
                        )}
                      </CommandGroup>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}

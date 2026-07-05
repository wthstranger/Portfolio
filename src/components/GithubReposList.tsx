import { useState, useEffect } from "react";
import { Github, Star, GitFork, Calendar, Code } from "lucide-react";
import { GithubRepo } from "../types";

export default function GithubReposList() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch("/api/github-repos");
        if (res.ok) {
          const data = await res.json();
          setRepos(data);
        }
      } catch (err) {
        // Suppress
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  return (
    <div className="space-y-4 select-none">
      <div className="flex items-center gap-2 mb-4">
        <Github className="w-4 h-4 text-cyan-400" />
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
          Live GitHub Repositories (wthstranger)
        </h4>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/40 animate-pulse h-28 flex flex-col justify-between"
            >
              <div className="w-1/2 h-3 bg-zinc-900 rounded" />
              <div className="w-3/4 h-2 bg-zinc-900 rounded" />
              <div className="flex gap-4">
                <div className="w-8 h-2 bg-zinc-900 rounded" />
                <div className="w-8 h-2 bg-zinc-900 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-950/80 hover:border-cyan-400/20 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-0.5 shadow-sm cursor-pointer select-text"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold font-mono text-zinc-200 group-hover:text-cyan-400 transition-colors truncate">
                    {repo.name}
                  </span>
                  <span className="text-[9px] font-mono font-semibold text-zinc-500 bg-zinc-900 border border-zinc-800/80 px-1.5 py-0.5 rounded-md shrink-0 uppercase">
                    {repo.language}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 font-sans line-clamp-2 leading-relaxed">
                  {repo.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-3 text-[10px] font-mono text-zinc-500 pt-3 border-t border-zinc-900">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500/20" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-3 h-3 text-rose-500" />
                    <span>{repo.forks_count}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(repo.updated_at).toLocaleDateString(undefined, { month: "short", year: "2-digit" })}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

# Guizhan Builds v2 Sunset Announcement

Guizhan Builds (builds.guizhanss.com) is saying goodbye. Over the coming weeks we will gradually wind this site down, and Guizhan Resources ([resources.guizhanss.com](https://resources.guizhanss.com)) will take over. This page covers why we're shutting down, the timeline, and how to migrate.

## Why we're shutting down

Feature development on this site ended some time ago, and we now only merge PRs that update repository information. Guizhan Resources is not a last-minute replacement: it has long been the planned successor and is now largely ready to use.

Meanwhile, our auto-builds rely on a GitHub Actions cron job that polls repositories for updates, and its trigger timing has been unreliable for a long time — builds often simply don't fire on schedule. The new site runs on Cloudflare Workers with dependable scheduling and offers a more complete set of services.

Now that the new site is ready to use, there is little reason to keep maintaining an old and unreliable piece of infrastructure. We are winding this site down and focusing our effort on the new one.

## Timeline

All times are Beijing time.

| Date | What happens |
| --- | --- |
| **2026-10-18 12:00** | We stop accepting new project PRs and turn off auto-builds. Existing project pages, builds, and downloads are unaffected. |
| **2026-11-15 12:00** | Full shutdown: this site's domain redirects to the new site, and the API goes offline. The build storage (R2) remains only as a data source for later migration of projects that have not migrated; it no longer provides public services. |

## How to migrate

Open the import page on the new site and follow the instructions: [Migrate to Guizhan Resources](https://resources.guizhanss.com/project/import/guizhan-builds-v2)

- **Single import**: any v2 project can be imported, whether it's yours or not.
- **Bulk import**: a project is eligible only when its GitHub username on this site matches the identifier of a user or organization on Guizhan Resources. If you own many projects, register on the new site with your GitHub username.

## Projects that don't migrate in time

After shutdown, the build storage (R2) will be kept only as a data source for later migration of projects that have not migrated. This site will no longer provide public services, including project pages, build listings, build-file downloads, or the API.

That said, this site stops producing new builds on 2026-10-18, so un-migrated projects will stay at their last build. Please migrate as soon as you can.

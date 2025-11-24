<!-- .github/copilot-instructions.md - guidance for AI coding agents -->
# Repo overview

This repository contains a full-stack app with a Java Spring Boot backend and a Next.js frontend:

- Backend: `Backend/compre` — Spring Boot (Java 21), Maven wrapper present (`mvnw`, `mvnw.cmd`). Main class: `com.utp.compre.CompreApplication`.
- Frontend: `Frontend` — Next.js (app router), `package.json` and `pnpm-lock.yaml` present (pnpm recommended). Next config: `Frontend/next.config.mjs`.

**Key folders**

- `Backend/compre/src/main/java/com/utp/compre/controller`: REST controllers (e.g. `UsuarioController`, `LoginController`, `ProductSearchController`).
- `Backend/compre/src/main/java/com/utp/compre/model`: domain models (e.g. `Usuario`).
- `Backend/compre/src/main/java/com/utp/compre/repository`: Spring Data JPA repositories (named query conventions used like `findByEmail`).
- `Frontend/app` and `Frontend/components`: Next.js pages and UI components.

# Big-picture architecture and data flow

- Frontend (Next.js) calls backend REST endpoints under `/api/*` (examples: `/api/usuario`, `/api/auth`, `/api/search`).
- Backend is primarily Spring MVC controllers, but some features use WebFlux/reactive types (see `ProductSearchController` which returns `Mono<List<...>>`). Expect a mixed-use of blocking and reactive code.
- Persistence: Spring Data JPA with MySQL. Entities <-> repositories follow typical Spring conventions; repository method names are used directly from controllers.
- Auth: simple login endpoint in `LoginController` uses `PasswordEncoder` and returns the user with the password nulled out. Passwords are stored encoded.

# Project-specific conventions & patterns (important for edits)

- Controllers are under `/controller` and typically use `@RequestMapping("/api/...")` with `@CrossOrigin("*")` applied. Follow the same base-path style when adding routes.
- Repositories use method names (e.g. `findByEmail`) — prefer adding repository methods instead of hand-writing queries where possible.
- Validation: controllers use `@Valid` and return `BindingResult` errors as a list of messages — replicate this pattern for new endpoints.
- Password handling: always use `PasswordEncoder` for passwords — do not return password fields (existing controllers set `user.setPassword(null)` before returning).
- Config: environment and keys live in `Backend/compre/src/main/resources/application.properties`. Example keys: `spring.datasource.*`, `serpapi.key`, `serpapi.base.url`.

# How to run & common workflows

- Backend (Windows PowerShell):
  - Run dev: `.
    mvnw.cmd spring-boot:run` (from `Backend/compre` directory). Alternatively use IDE run configuration on `CompreApplication`.
  - Build artifact: `.
    mvnw.cmd clean package` then run `java -jar target/compre-0.0.1-SNAPSHOT.jar`.
  - Tests: `.
    mvnw.cmd test`.

- Frontend (recommended: pnpm, fallback npm):
  - Install: `pnpm install` (or `npm install` if pnpm not available).
  - Dev server: `pnpm dev` (or `npm run dev`). Port defaults to Next.js dev port (usually 3000).
  - Build: `pnpm build` then `pnpm start` for production.

Notes:
- Backend defaults to `server.port=8080` (see `application.properties`). Create the MySQL database before starting (`create database compre;`).
- The repository contains a SerpAPI key in `application.properties`; treat it as sensitive if moving code.

# Integration points & external dependencies

- MySQL database configured via `spring.datasource.*`.
- SerpApi used by product search (config keys: `serpapi.key`, `serpapi.base.url`). Look at `ProductSearchService` for usage patterns.
- Spring Boot modules: WebMVC, WebFlux, Data JPA, Security — expect both blocking and reactive styles.

# Editing guidance and PR checklist for AI agents

- Small change scope: modify only in one layer (controller/service/repository) unless cross-layer changes are required. Keep public APIs stable.
- Follow existing package and naming conventions (`com.utp.compre.*`).
- When adding endpoints:
  - Add tests if the change affects business logic (use Maven tests in backend).
  - Update `application.properties` keys only when necessary; prefer reading values through `@Value` or configuration properties.
- When working on frontend-backend integration, prefer using the concrete endpoint examples discovered here: `POST /api/usuario/registrar`, `POST /api/auth/login`, `GET /api/search?query=...`.

# Quick references (files to open first)

- `Backend/compre/pom.xml` — dependencies and Java version (21).
- `Backend/compre/src/main/java/com/utp/compre/CompreApplication.java` — boot entrypoint.
- `Backend/compre/src/main/resources/application.properties` — DB and external keys.
- `Backend/compre/src/main/java/com/utp/compre/controller/*` — endpoint patterns and controllers.
- `Frontend/package.json`, `Frontend/next.config.mjs`, `Frontend/app` — Next.js app structure and scripts.

If anything here is incomplete or you want me to surface more detailed examples (e.g., service implementations, DTOs, or sample requests for endpoints), tell me which area to expand and I'll update this file.

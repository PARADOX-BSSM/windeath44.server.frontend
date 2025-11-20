# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` - Starts Vite development server with hot reload
- **Build**: `npm run build` - Builds the application for production using Vite (outputs to `dist/`)
- **Lint**: `npm run lint` - Runs ESLint to check code quality
- **Preview**: `npm run preview` - Previews the built application locally
- **Format**: `npx prettier --write <file>` - Format code with Prettier

## Environment Variables

Create a `.env` file in the root directory:

```
VITE_SERVER=<backend-server-url>
```

The server URL is used by API endpoints in [src/config/index.ts](src/config/index.ts) to construct full endpoint URLs with HTTPS protocol.

## Commit Convention

Follow the Korean commit convention format: `Type :: 변경 사항 요약`

Title must be under 30 characters. Body is optional.

| Type     | Description                                  |
| -------- | -------------------------------------------- |
| feat     | 새로운 기능 추가                             |
| fix      | 버그 수���                                    |
| refactor | 코드 리팩토링 (기능 변경 없이 구조 개선)     |
| test     | 테스트 코드 작성                             |
| chore    | 기타 자잡한 작업 (빌드 설정, 패키지 관리 등) |
| docs     | 문서 추가 또는 수정                          |
| delete   | 불필요한 코드나 파일 삭제                    |
| build    | 빌드 관련 파일 및 설정 변경                  |

Example: `feat :: 마우스 드래그 기능 추가`

## High-Level Architecture

This is a React-based desktop environment simulator that creates an interactive memorial system for anime characters. Built with Vite, TypeScript, and modern libraries.

### Core Architecture Pattern: Desktop OS Metaphor

The application simulates a complete desktop operating system with windowing, focus management, and application lifecycle. Think of it as building a mini-OS in the browser.

**Boot Flow**: `index.html` → `bootLoder.tsx` (React root + QueryClientProvider) → `kernel.tsx` (boot animation + mobile detection) → `windowManager/index.tsx` (desktop environment)

#### Core System Components

- **Kernel** ([src/services/kernel.tsx](src/services/kernel.tsx)): Application entry point
  - Manages 2.7-second boot animation (cached via sessionStorage per browser session)
  - Detects mobile devices via user agent and routes to MobileConnect
  - Sets base font size to 16px
  - Controls transition from boot screen to WindowManager

- **WindowManager** ([src/services/windowManager/](src/services/windowManager/)): Central window orchestrator
  - Manages all window instances, focus state, and z-index layering
  - Handles drag/resize operations for all windows
  - Coordinates with Jotai atoms for global state
  - Controls cursor states (default, drag, hand, etc.)

- **Application Framework** ([src/applications/layout/](src/applications/layout/)): Reusable window component
  - Provides draggable/resizable window chrome
  - Window controls (minimize, maximize, close)
  - Focus and layer (z-index) management
  - Consistent styling across all applications

#### Application Registry System

**Application Manager** ([src/applications/data/importManager.tsx](src/applications/data/importManager.tsx)): Centralized app registry

- Defines all 35+ applications with metadata (icons, sizes, initialization)
- Lazy loads apps via React.lazy() for code splitting
- Single source of truth for application configuration

#### Key State Management (Jotai Atoms)

**Window & Process Management** ([src/atoms/](src/atoms/)):

- `windowManager.ts`: Focus state, layer counter, tab interrupts, login state (`'false' | 'true' | 'guest'`)
- `processManager.ts`: Running processes as TaskType[] array
- `taskTransformer.ts`: Navigation function to switch between apps
- `alerter.ts`: Global alert/notification system
- `memorialManager.ts`: Memorial-specific state (memorial ID, character ID)
- `inputManager.ts`: Form input state coordination
- `version.ts`: Application version tracking

**Task-Based Navigation Pattern**: Instead of traditional routing, apps navigate by adding/removing tasks from the `taskManagerAtom`. Use hooks in [src/hooks/](src/hooks/):
- `processManager.tsx`: Add/remove tasks
- `taskTransformer.tsx`: Navigate between applications
- `taskSearch.tsx`: Find applications by name

### Application Structure

**Applications** ([src/applications/applicationList/](src/applications/applicationList/)): 35+ desktop applications organized by feature:

**Memorial System** (core feature):
- `memorial/`: Main memorial viewer with comments
- `memorialApply/`: Create new memorial
- `memorialApproach/`: Browse/search memorials
- `memorialChief/`: Admin approval workflows
- `memorialCommit/`: Submit memorial updates
- `memorialHistory/`: View memorial timeline
- `memorialMerge/`: Merge duplicate memorials
- `memorialPRManager/` & `memorialPRDetail/`: Pull request system for memorial updates
- `memorialConflictResolve/`: Handle duplicate/conflict resolution
- `memorialViewer/`: Detailed memorial display

**Interactive Features**:
- `bow/`: Mourning/respect interaction
- `sulkkagi/`, `sulkkagiApproach/`, `sulkkagiMenu/`: Stone game with physics (Matter.js)
- `chatBot/`, `chatbotSelect/`, `teachingChatBot/`: AI chatbot system

**Utilities**:
- `myComputer/`: File explorer
- `search/`: Global search
- `terminal/`: Command line interface
- `help/`: Documentation viewer
- `alert/`: System alerts

**System Windows**:
- `anniversaryWindow/`: Birthday/anniversary notifications
- `deadWindow/`: Deceased character display
- `NotificationWindow3/`, `NotificationApproach/`: Notification system

**Component Pattern**: Each application follows this structure:
- `index.tsx`: Main component logic
- `style.ts`: Emotion-based styled components
- Optional `data.ts`: Static data/constants

**Shared Components** ([src/applications/components/](src/applications/components/)): 16+ reusable components
- `memorialBtn/`, `memorialTextarea/`, `memorialWithIcon/`: Memorial UI elements
- `comment/`: Comment display/interaction
- `chatMessage/`: Chat bubble components
- `button/`, `inputs/`: Generic form elements
- `taskBar/`: Taskbar components

### API Integration & Authentication

**API Layer** ([src/api/](src/api/)): 43+ API endpoints organized by domain

- `auth/`: Authentication (login, signup, email verification, password change, cookie management)
- `memorial/`: Memorial CRUD operations (40+ endpoints)
- `chatbot/`: Chatbot interactions
- `user/`: User profile management
- `anime/`: Anime character data
- `notification/`: Notification system

**Configuration**: [src/config/index.ts](src/config/index.ts) - Server endpoint from `VITE_SERVER` env variable

**Authentication Flow** ([src/api/axiosInstance.ts](src/api/axiosInstance.ts)): Automatic token refresh with axios interceptors

1. **Login**: POST `/auth/login` → Receives access token in `Authorization` header → Stored in `access_token` cookie
2. **Request Interceptor**: Reads token from cookie → Attaches as `Bearer` header (skips auth endpoints)
3. **Response Interceptor** (401 handling):
   - On 401 error: Delete existing token
   - POST `/auth/reissue` to refresh token
   - Save new token from `Authorization` header to cookie
   - Retry original request with new token
   - On refresh failure: Redirect to `/login`
4. **Cookie Management** ([src/api/auth/cookie.ts](src/api/auth/cookie.ts)):
   - `setCookie()`: Stores with 1-day expiration, Secure flag, SameSite=Lax
   - `getCookie()`: Retrieves from document.cookie
   - `deleteCookie()`: Removes with past date
   - Refresh tokens handled via httpOnly cookies (server-managed)

### Technology Stack

- **State**: Jotai (atomic state), TanStack React Query (server state)
- **HTTP**: Axios with interceptors
- **Styling**: Emotion (styled-components)
- **Physics**: Matter.js (interactive elements)
- **Gestures**: react-use-gesture (drag/drop)
- **Utils**: react-textarea-autosize, react-avatar-editor, qs (query params)

### TypeScript Configuration

- Path alias: `@/*` maps to `src/*` ([tsconfig.json](tsconfig.json), [tsconfig.path.json](tsconfig.path.json))
- Strict mode enabled
- Target: ESNext

### Development Patterns

**Window Creation**: To create a new window/application:
1. Create app component in `src/applications/applicationList/<appName>/`
2. Register in `src/applications/data/importManager.tsx` with lazy loading
3. Define icon, default size, and initialization logic
4. Use `processManager` hook to add task to `taskManagerAtom`

**State Access**: Use Jotai hooks:
```typescript
import { useAtom } from 'jotai';
import { focusAtom, layerAtom } from '@/atoms/windowManager';

const [focus, setFocus] = useAtom(focusAtom);
```

**Navigation**: Use task transformer:
```typescript
import { useTaskTransformer } from '@/hooks/taskTransformer';

const taskTransformer = useTaskTransformer();
taskTransformer('memorial', { memorialId: 123 });
```

**API Calls**: Import from `src/api/` - token handling is automatic:
```typescript
import { getMemorial } from '@/api/memorial/getMemorial';

const data = await getMemorial(memorialId);
```

### Custom Systems

- **Custom Cursor** ([src/lib/setCursorImg.tsx](src/lib/setCursorImg.tsx)): SVG-based cursor states (default, drag, hand, etc.)
- **Physics Engine**: Matter.js integration for interactive bow/stone game elements
- **Custom Tag Parser** ([src/lib/customTag/](src/lib/customTag/)): Parse and render custom HTML tags
- **Responsive Sizing** ([src/hooks/getPixelFromPercent.tsx](src/hooks/getPixelFromPercent.tsx)): Convert percentage to pixels based on viewport

## Code Style

This project uses Prettier with strict formatting rules:

- Single quotes for strings
- Semicolons required
- 2-space indentation (no tabs)
- Trailing commas in objects/arrays
- 100 character line width
- Single attribute per line in JSX

Format code: `npx prettier --write <file>`

ESLint configuration uses React + React Hooks + React Refresh plugins.

## Session Management & Mobile Support

**Boot Sequence** ([src/services/booting/](src/services/booting/)):
- First load per browser session shows 2.7-second boot animation
- Uses sessionStorage key `hasBootedSession` to track boot state
- Refreshing page skips animation (persists per session)

**Mobile Detection** ([src/services/kernel.tsx](src/services/kernel.tsx)):
- User agent detection in Kernel
- Mobile users see `<MobileConnect />` instead of desktop environment
- Desktop environment is NOT accessible on mobile devices

## MCP Servers

### Apidog MCP Server

Configuration in [.mcp.json](.mcp.json):
- Provides API endpoint documentation and testing capabilities
- Integrates with project's backend API specifications

### Figma Dev Mode MCP Rules

- The Figma Dev Mode MCP Server provides an assets endpoint for images and SVG assets
- If the Figma Dev Mode MCP Server returns a localhost source for an image or SVG, use that source directly
- DO NOT import/add new icon packages - all assets should come from Figma payload
- DO NOT use or create placeholders if a localhost source is provided

## Important Notes

- No test framework is currently configured (consider adding Vitest + React Testing Library)
- Multi-language support: Korean/English mixed interface
- Repository: https://github.com/PARADOX-BSSM/windeath44.server.frontend

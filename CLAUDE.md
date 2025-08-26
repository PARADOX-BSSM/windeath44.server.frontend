# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` - Starts Vite development server
- **Build**: `npm run build` - Builds the application using Vite
- **Lint**: `npm run lint` - Runs ESLint to check code quality
- **Preview**: `npm run preview` - Previews the built application

## Commit Convention

Follow the Korean commit convention format: `Type :: 변경 사항 요약`

| Type     | Description                                  |
| -------- | -------------------------------------------- |
| feat     | 새로운 기능 추가                             |
| fix      | 버그 수정                                    |
| refactor | 코드 리팩토링 (기능 변경 없이 구조 개선)     |
| test     | 테스트 코드 작성                             |
| chore    | 기타 자잡한 작업 (빌드 설정, 패키지 관리 등) |
| docs     | 문서 추가 또는 수정                          |
| delete   | 불필요한 코드나 파일 삭제                    |
| build    | 빌드 관련 파일 및 설정 변경                  |

Example: `feat :: 마우스 드래그 기능 추가`

## High-Level Architecture

This is a React-based desktop environment simulator built with Vite, TypeScript, and various modern libraries.

### Core Architecture Pattern

**Desktop Environment Simulation**: The application simulates a desktop OS with:

- **Kernel** (`src/services/kernel.tsx`): Main entry point managing boot process and window system
- **WindowManager** (`src/services/windowManager/`): Handles window lifecycle, focus management, and multi-window operations
- **Application Framework** (`src/applications/layout/`): Provides windowing system with drag, resize, minimize, maximize functionality

### Key State Management

**Jotai Atoms** (`src/atoms/`): Global state management using atomic approach

- `windowManager.ts`: Window focus, layer management, tab interrupts, login state
- `processManager.ts`: Running processes and task management
- `alerter.ts`: Alert/notification system
- `memorialManager.ts`: Memorial-specific state
- `inputManager.ts` & `taskTransformer.ts`: Input handling and task processing

### Application Structure

**Applications** (`src/applications/applicationList/`): Each application is a separate component:

- Memorial system applications (memorial, memorialApply, memorialHistory, etc.)
- Utility applications (myComputer, search, terminal)
- Teaching chatbot system
- Authentication utilities

**Component Architecture**: Each application follows consistent structure:

- `index.tsx`: Main component logic
- `style.ts`: Emotion-based styled components
- Optional `data.ts`: Static/mock data

### API Integration

**API Layer** (`src/api/`): Organized by domain:

- `auth/`: Authentication endpoints
- `memorial/`: Memorial-related API calls
- `anime/`: Animation/character data
- `user/`: User management
- `axiosInstance.ts`: Configured HTTP client

**Configuration** (`src/config/index.ts`): Server endpoint configuration with environment variable support

### Custom Systems

**Physics Integration**: Matter.js integration for interactive elements
**Custom Cursor System**: SVG-based cursor states (default, drag, hand, etc.)
**Memorial System**: Core feature for character memorials with bow/comment functionality
**Teaching Chatbot**: Educational AI interaction system

### Development Notes

- Uses Vite with React plugin and TypeScript path resolution
- Emotion for styled-components with theme support
- TanStack Query for server state management
- Custom responsive font sizing based on viewport
- Boot sequence simulation with localStorage persistence
- Multi-language support (Korean/English mixed interface)

The codebase follows a desktop OS metaphor where each "application" runs in draggable/resizable windows managed by a central window manager, with global state coordination through Jotai atoms.

# MCP Servers

## Figma Dev Mode MCP Rules

- The Figma Dev Mode MCP Server provides an assets endpoint which can serve image and SVG assets
- IMPORTANT: If the Figma Dev Mode MCP Server returns a localhost source for an image or an SVG, use that image or SVG source directly
- IMPORTANT: DO NOT import/add new icon packages, all the assets should be in the Figma payload
- IMPORTANT: do NOT use or create placeholders if a localhost source is provided

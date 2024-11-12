# React Session Control

This repository contains a React custom hook `useSessionControl` that helps manage session state across multiple browser tabs. The solution ensures that when a user has the same app open in multiple tabs, the session state is synchronized, and only one tab can have an active session at a time. If a user switches tabs or opens a new tab, the session is transferred or ended accordingly.

!['React Session Control demonstration gif'](./public/demo-video.gif)

## ✨ Description

In modern web applications, it's common for users to have multiple tabs open at the same time. However, this can lead to inconsistencies when it comes to managing sessions, as a session might be open in one tab and the user might not be aware that it's also active in another. This solution ensures that:

1. A user can have only one active session across tabs.
2. If a new tab is opened, it becomes the active session, and the other tabs show that the session is open elsewhere.
3. When the session is reactivated in one tab, it is closed in all other tabs.

This is achieved by utilizing the `localStorage` API to share session information between tabs, and `useRef` to maintain a constant tab identifier.

## 🛠️ Motivation

In some modern applications, it's important to keep track of user sessions across different tabs. Without this mechanism, users could have conflicting sessions open across tabs, causing problems like:

- The user might unknowingly close their session in one tab while interacting with the app in another.
- One tab may not reflect the changes made in another tab.

By using this solution, we ensure that the session is managed properly, with the active session being exclusive to one tab, while informing the user when the session is open in another tab.

## 🔧 How It Works

1. **Session State Synchronization**: The hook stores the session state (`active` or `inactive`) in `localStorage`, which is accessible across all tabs.
2. **Tab Identification**: Each tab gets a unique ID generated by `uuidv4()`, which ensures each tab is distinguishable from others.
3. **Session Activation and Deactivation**: When a tab is opened, the session is set to "active" in that tab. If another tab opens, it recognizes that the session is already active and notifies the user. If the user activates the session in one tab, it is deactivated in all other tabs.
4. **Storage Event Listener**: The `storage` event is used to listen for changes in `localStorage` (such as opening or closing the session in another tab), which allows the app to reactively update the UI.

### Code Workflow

- On app load, the hook checks if a session is already active by reading from `localStorage`.
- If a session is active in another tab, it informs the user and offers the option to transfer the session to the current tab.
- If the session is ended in one tab, the session is also removed from `localStorage`, affecting all other tabs.

## Advantages

- **Consistency**: Ensures that the session state is consistent across multiple tabs.
- **User-Friendly**: Notifies the user when the session is active in another tab and offers a way to transfer the session to the current tab.
- **Performance**: Using `useRef` ensures that the tab identifier remains constant throughout the lifecycle of the component without triggering unnecessary re-renders.
- **Scalability**: The approach can be scaled to more complex scenarios, such as managing user states across different windows or even browsers (with additional logic).

## Installation

To install and use this project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/session-management-multiple-tabs.git
   ```

2. Install the dependencies:
   ```bash
   cd session-management-multiple-tabs
   npm install
   ```

## Usage

1. Import the custom hook `useSessionControl` in your React component:

   ```tsx
   import useSessionControl from "./use-session-control.hook";
   ```

2. Call the hook in your component:

   ```tsx
   const { sessionActive, otherTabActive, startSession, endSession } =
     useSessionControl();
   ```

3. Use the session state and methods in your component to display the appropriate UI:
   ```tsx
   return (
     <div>
       {sessionActive ? (
         <>
           <h1>Session Active</h1>
           <button onClick={endSession}>End Session</button>
         </>
       ) : otherTabActive ? (
         <>
           <h1>Session Open in Another Tab</h1>
           <button onClick={startSession}>Transfer Session to This Tab</button>
         </>
       ) : (
         <h1>Session Closed</h1>
       )}
     </div>
   );
   ```
# My Banking System

A simple command-line banking system built with Node.js.  
Allows users to register, login, check balance, change PIN, transfer money, and view notifications.

---

## Features

- Register a new customer with name, email, password, and 4-digit PIN.
- Login as an existing customer.
- Check your current account balance.
- Change your 4-digit PIN.
- Transfer money to another registered user (with PIN confirmation).
- View notifications for money received.
- Exit the system safely.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- Terminal or command prompt.

### Installation

1. Clone the repository or download the project files.
2. Open a terminal in the project directory.
3. Run the command to install dependencies:

```bash
npm install
   chalk
   prompt-sync
```

## Usage

Run the app with:

```bash
node yourScriptName.js
```

follow the on-screen prompts to use the banking system..

# How to use

1. Register a customer with name, email, password, and PIN.

2. Login with your name and password.

3. Use the menu options to:

- Check your balance.
- Change your PIN.
- Transfer money to others (you’ll be asked for your PIN to confirm).
- View notifications when you receive money.

4. Exit to quit the application.

# Notes:

- Each user starts with a default balance of $1000.
- Transfers are only possible between different users.
- Notifications appear when you receive money from others.

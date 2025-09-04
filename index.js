const chalk = require("chalk");
const prompt = require("prompt-sync")();

function myBankingSystem() {
  let users = [];
  let currentUser = null;
  let choice;

  do {
    console.clear();
    console.log(chalk.green("Welcome to my banking system"));
    console.log("\nChoose an option to proceed:");
    console.log("1. Register a customer");
    console.log("2. Login a customer");
    console.log("3. Check balance");
    console.log("4. Change pin");
    console.log("5. Transfer money");
    console.log("6. Notifications");
    console.log("7. Exit");

    choice = prompt("Enter your choice (1-7): ");

    if (choice === "1") {
      let name, email, password, pin;

      do {
        name = prompt("Enter your name: ").trim();
        if (!name) console.log(chalk.red("Name cannot be empty."));
      } while (!name);

      const existingUser = users.find((user) => user.name === name);
      if (existingUser) {
        console.log(chalk.red("User with that name already exists."));
      } else {
        do {
          email = prompt("Enter your email: ").trim();
          if (!email || !email.includes("@"))
            console.log(chalk.red("Please enter a valid email."));
        } while (!email || !email.includes("@"));

        do {
          password = prompt("Enter your password: ").trim();
          if (!password) console.log(chalk.red("Password cannot be empty."));
        } while (!password);

        do {
          pin = prompt("Set a 4-digit PIN: ").trim();
          if (pin.length !== 4 || isNaN(pin))
            console.log(chalk.red("PIN must be exactly 4 digits and numeric."));
        } while (pin.length !== 4 || isNaN(pin));

        const newUser = {
          name,
          email,
          password,
          pin,
          balance: 1000,
          notifications: [],
        };

        users.push(newUser);
        console.log(`${newUser.notifications.length} notifications`);
        console.log(chalk.green("Registration successful!"));
      }
    } else if (choice === "2") {
      if (users.length === 0) {
        console.log(chalk.red("No users registered. Please register first."));
      } else {
        const loginName = prompt("Enter your name: ").trim();
        const loginPassword = prompt("Enter your password: ").trim();

        const foundUser = users.find(
          (user) => user.name === loginName && user.password === loginPassword
        );

        if (foundUser) {
          currentUser = foundUser;
          console.log(
            chalk.green(`Welcome back, ${currentUser.name}! You are logged in.`)
          );
        } else {
          console.log(chalk.red("Invalid login credentials."));
        }
      }
    } else if (choice === "3") {
      if (!currentUser) {
        console.log(chalk.red("You must be logged in to check balance."));
      } else {
        console.log(
          chalk.blue(
            `${currentUser.name}, your current balance is $${currentUser.balance}`
          )
        );
      }
    } else if (choice === "4") {
      if (!currentUser) {
        console.log(chalk.red("You must be logged in to change your PIN."));
      } else {
        const currentPin = prompt("Enter your current PIN: ").trim();

        if (currentPin !== currentUser.pin) {
          console.log(chalk.red("Incorrect current PIN."));
        } else {
          let newPin;

          do {
            newPin = prompt("Enter a new 4-digit PIN: ").trim();
            if (newPin.length !== 4 || isNaN(newPin)) {
              console.log(
                chalk.red("PIN must be exactly 4 digits and numeric.")
              );
            }
          } while (newPin.length !== 4 || isNaN(newPin));

          currentUser.pin = newPin;
          console.log(chalk.green("Your PIN has been successfully changed."));
        }
      }
    } else if (choice === "5") {
      if (!currentUser) {
        console.log(chalk.red("You must be logged in to transfer funds."));
      } else {
        const recipientName = prompt("Enter recipient's name: ").trim();
        const recipient = users.find(
          (user) =>
            user.name === recipientName && user.name !== currentUser.name
        );

        if (!recipient) {
          console.log(
            chalk.red("Recipient not found or cannot transfer to yourself.")
          );
        } else {
          const amount = parseFloat(
            prompt("Enter amount to transfer: ").trim()
          );

          if (isNaN(amount) || amount <= 0) {
            console.log(chalk.red("Invalid amount."));
          } else if (currentUser.balance < amount) {
            console.log(chalk.red("Insufficient balance."));
          } else {
            const pin = prompt("Enter your PIN to confirm transfer: ").trim();

            if (pin !== currentUser.pin) {
              console.log(chalk.red("Incorrect PIN. Transfer cancelled."));
            } else {
              currentUser.balance -= amount;
              recipient.balance += amount;
              recipient.notifications.push(
                `You received $${amount.toFixed(2)} from ${currentUser.name}`
              );
              console.log(
                chalk.green(
                  `Successfully transferred $${amount.toFixed(2)} to ${
                    recipient.name
                  }.`
                )
              );
            }
          }
        }
      }
    } else if (choice === "6") {
      if (!currentUser) {
        console.log(
          chalk.redBright("You must be logged in to view your notifications.")
        );
      } else {
        if (currentUser.notifications.length === 0) {
          console.log(chalk.yellow("You have no notifications."));
        } else {
          console.log(
            chalk.green(
              `You have a new notification(s).`
            )
          );

          currentUser.notifications.forEach((note, i) => {
            console.log(chalk.cyan(`${i + 1}. ${note}`));
          });

          // currentUser.notifications = [];
          console.log(chalk.blue("All notifications marked as read."));
        }
      }
    } else if (choice === "7") {
      console.log(chalk.blue("Thanks for using the banking system!"));
      break;
    } else {
      console.log(
        chalk.red("Invalid choice. Please enter a number from 1 to 7.")
      );
    }
    prompt(chalk.gray("\nPress Enter to continue..."));
  } while (choice !== "7");
}

myBankingSystem();

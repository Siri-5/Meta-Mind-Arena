'use client';
export const courseData = [
    {
      id: 1,
      levelId: 1,
      title: "User Input / Output",
      content: `
        <h3 style="margin-bottom: 10px;">C++ Basics: Input, Output, and Program Structure</h3>
        <p style="margin-bottom: 10px;">Programming is the process of creating a set of instructions that tell a computer how to perform a task. These instructions can be written in various programming languages, each with its own syntax and rules.</p>
      
        <h4 style="margin-bottom: 10px;"><strong>Why Programming?</strong></h4>
        <p>Programming is an essential skill in today's digital world. It helps you automate tasks, build applications, analyze data, and solve complex problems. Whether you want to develop websites, create mobile apps, or work with artificial intelligence, programming is the foundation.</p>
        
        <h3 style="margin-bottom: 10px;">C++ Basic Input/Output</h3>
        <p style="margin-bottom: 10px;">Understanding basic input and output operations is essential for writing interactive C++ programs. This guide covers the fundamental concepts needed to get started with C++ programming.</p>

        <h4 ><strong>1. Including Libraries</strong></h4>
        <p>Libraries provide pre-built functions that make programming easier:</p>
        <ul style="margin-bottom: 10px;">
          <li>Use <code>#include&lt;iostream&gt;</code> for input and output operations.</li>
          <li>Use <code>#include&lt;math.h&gt;</code> for mathematical functions.</li>
          <li>Use <code>#include&lt;bits/stdc++.h&gt;</code> to include multiple standard libraries at once (commonly used in competitive programming).</li>
        </ul>

        <h4><strong>2. Basic C++ Program Structure</strong></h4>
        <pre style="background-color:#CED4D3; padding: 20px; border-radius: 5px; height: fit-content; max-height: 100; width: fit-content; max-width: 100%;"><code>#include&lt;iostream&gt;
int main() {
    // Your code here
    return 0;
}</code></pre>
        <p style="margin-bottom: 10px;">The <code>main()</code> function serves as the entry point for execution. The <code>return 0;</code> statement indicates successful program termination.</p>

        <h4"><strong>3. Output with <code>cout</code></strong></h4>
        <pre style="background-color:#CED4D3; padding: 20px; border-radius: 5px; height: fit-content; max-height: 100; width: fit-content; max-width: 100%;"><code>#include&lt;iostream&gt;
int main() {
    std::cout << "Hey, Striver!";
    return 0;
}</code></pre>
        <p><strong>Output:</strong></p>
        <pre style="background-color:#CED4D3; padding: 20px; border-radius: 5px; height: fit-content; max-height: 100; width: fit-content; max-width: 100%;"><code>Hey, Striver!</code></pre>

        <h4>Adding Line Breaks</h4>
        <p>To print output on a new line, use <code>\n</code> or <code>std::endl</code>.</p>
        <pre style="background-color:#CED4D3; padding: 20px; border-radius: 5px; height: fit-content; max-height: 100; width: fit-content; max-width: 100%;"><code>std::cout << "Hello, World!\n";
std::cout << "Welcome to C++!" << std::endl;</code></pre>
        <p><strong>Difference:</strong></p>
        <ul style="margin-bottom: 10px;">
          <li><code>\n</code> is faster as it only inserts a new line.</li>
          <li><code>std::endl</code> inserts a new line and flushes the output buffer, making it slightly slower.</li>
        </ul>

        <h4><strong>4. Using <code>namespace std</code></strong></h4>
        <pre style="background-color:#CED4D3; padding: 20px; border-radius: 5px; height: fit-content; max-height: 100; width: fit-content; max-width: 100%;"><code>#include&lt;iostream&gt;
using namespace std;
int main() {
    cout << "Hello, World!";
    return 0;
}</code></pre>
        <p style="margin-bottom: 10px;">However, in larger projects, explicitly using <code>std::cout</code> is recommended to avoid naming conflicts.</p>

        <h4 ><strong>5. Taking User Input with <code>cin</code></strong></h4>
        <pre style="background-color:#CED4D3; padding: 20px; border-radius: 5px; height: fit-content; max-height: 100; width: fit-content; max-width: 100%;"><code>#include&lt;iostream&gt;
using namespace std;
int main() {
    int x;
    cin >> x;
    cout << "Value of x: " << x;
    return 0;
}</code></pre>
        <p><strong>Input:</strong> <code>10</code></p>
        <p><strong>Output:</strong> <code>Value of x: 10</code></p>

        <h4 style="margin-bottom: 10px;">Taking Multiple Inputs</h4>
        <pre style="background-color:#CED4D3; padding: 20px; border-radius: 5px; height: fit-content; max-height: 100; width: fit-content; max-width: 100%;"><code>int x, y;
cin >> x >> y;
cout << "Value of x: " << x << " and y: " << y;</code></pre>
        <p><strong>Input:</strong> <code>10 20</code></p>
        <p><strong>Output:</strong> <code>Value of x: 10 and y: 20</code></p>
        <p>Understanding these basics will help you build more complex C++ programs efficiently.</p>
      `,
      examples: [
        {
          title: "Hello World in JavaScript",
          description: "The traditional first program in any language prints 'Hello World' to the screen.",
          code: `// This is a comment
  console.log("Hello, World!");
  // Output: Hello, World!`,
          explanation: "This simple program uses the console.log() function to display text in the console. It's a great way to verify that your development environment is set up correctly."
        }
      ],
      exercises: [
        {
          title: "Your First Program",
          description: "Write a program that displays your name and a welcome message."
        },
        {
          title: "Basic Math",
          description: "Create a program that calculates and displays the sum of two numbers."
        }
      ]
    },
    {
      id: 2,
      levelId: 1,
      title: "Variables and Data Types",
      content: `
        <h3>Understanding Variables</h3>
        <p>Variables are containers for storing data values. In programming, we use variables to store information that can be referenced and manipulated in a program.</p>
        
        <h4>Naming Variables</h4>
        <p>Variable names should be descriptive and follow these rules:</p>
        <ul>
          <li>Start with a letter, underscore, or dollar sign</li>
          <li>Cannot start with a number</li>
          <li>Case-sensitive (age and AGE are different variables)</li>
          <li>Cannot use reserved keywords like 'if' or 'function'</li>
        </ul>
        
        <h4>Common Data Types</h4>
        <ul>
          <li><strong>Numbers:</strong> Integers or floating-point values (42, 3.14)</li>
          <li><strong>Strings:</strong> Text values enclosed in quotes ("Hello")</li>
          <li><strong>Booleans:</strong> Logical values (true or false)</li>
          <li><strong>Arrays:</strong> Collections of values [1, 2, 3]</li>
          <li><strong>Objects:</strong> Complex data structures with properties</li>
        </ul>
      `,
      examples: [
        {
          title: "Declaring Variables in JavaScript",
          description: "How to create and use variables with different data types.",
          code: `// Number variables
  let age = 25;
  const pi = 3.14159;
  
  // String variables
  let name = "Alice";
  let greeting = 'Hello there!';
  
  // Boolean variables
  let isStudent = true;
  let hasCompleted = false;
  
  // Array variable
  let colors = ["red", "green", "blue"];
  
  // Object variable
  let person = {
    name: "Bob",
    age: 30,
    isEmployed: true
  };`,
          explanation: "This example shows how to declare variables of different types. The 'let' keyword creates variables that can be reassigned, while 'const' creates variables with values that cannot be changed."
        }
      ],
      exercises: [
        {
          title: "Variable Practice",
          description: "Create variables to store information about yourself (name, age, favorite color, etc.)"
        },
        {
          title: "Data Types Challenge",
          description: "Identify the data type of each variable in a given code snippet."
        }
      ]
    },
    {
      id: 3,
      levelId: 1,
      title: "Control Flow: Conditionals",
      content: `
        <h3>Making Decisions in Code</h3>
        <p>Control flow structures allow your program to make decisions based on conditions. Conditional statements help your program execute different code blocks depending on whether a condition is true or false.</p>
        
        <h4>If Statements</h4>
        <p>The most basic form of decision making is the if statement, which executes a block of code if a specified condition is true.</p>
        
        <h4>If-Else Statements</h4>
        <p>If-else statements allow you to execute one block of code if a condition is true, and another block if it's false.</p>
        
        <h4>Else-If Statements</h4>
        <p>Else-if statements allow you to check multiple conditions in sequence.</p>
        
        <h4>Switch Statements</h4>
        <p>Switch statements provide a cleaner way to check a single variable against multiple possible values.</p>
      `,
      examples: [
        {
          title: "Conditional Statements",
          description: "Using if, else if, and else to control program flow.",
          code: `// Basic if statement
  let temperature = 75;
  
  if (temperature > 80) {
    console.log("It's hot outside!");
  }
  
  // If-else statement
  let hour = 14;
  
  if (hour < 12) {
    console.log("Good morning!");
  } else {
    console.log("Good afternoon/evening!");
  }
  
  // Else-if statement
  let score = 85;
  
  if (score >= 90) {
    console.log("Grade: A");
  } else if (score >= 80) {
    console.log("Grade: B");
  } else if (score >= 70) {
    console.log("Grade: C");
  } else {
    console.log("Grade: F");
  }
  
  // Switch statement
  let day = "Monday";
  
  switch (day) {
    case "Monday":
      console.log("Start of the work week");
      break;
    case "Friday":
      console.log("End of the work week");
      break;
    case "Saturday":
    case "Sunday":
      console.log("Weekend!");
      break;
    default:
      console.log("Midweek");
  }`,
          explanation: "This example demonstrates different ways to implement conditional logic in your code. The if statement checks a condition, the if-else provides an alternative, and the else-if allows for multiple conditions. The switch statement is useful when comparing a single value against multiple options."
        }
      ],
      exercises: [
        {
          title: "Age Classifier",
          description: "Write a program that categorizes a person as a child, teenager, adult, or senior based on their age."
        },
        {
          title: "Grade Calculator",
          description: "Create a program that converts a numerical score to a letter grade (A, B, C, D, or F)."
        }
      ]
    },
    {
      id: 4,
      levelId: 1,
      title: "Loops and Iteration",
      content: `
        <h3>Repeating Code with Loops</h3>
        <p>Loops are used to execute a block of code multiple times. They are essential for tasks that require repetition, such as processing items in an array or running code until a certain condition is met.</p>
        
        <h4>For Loops</h4>
        <p>For loops are used when you know in advance how many times you want to execute a block of code.</p>
        
        <h4>While Loops</h4>
        <p>While loops continue executing as long as a specified condition is true. They're useful when you don't know in advance how many iterations you need.</p>
        
        <h4>Do-While Loops</h4>
        <p>Do-while loops are similar to while loops, but they always execute the code block at least once before checking the condition.</p>
        
        <h4>Loop Control</h4>
        <p>You can control loop execution with special statements:</p>
        <ul>
          <li><strong>break:</strong> Exits the loop completely</li>
          <li><strong>continue:</strong> Skips the current iteration and moves to the next one</li>
        </ul>
      `,
      examples: [
        {
          title: "Working with Loops",
          description: "Different types of loops and how to use them.",
          code: `// For loop
  for (let i = 0; i < 5; i++) {
    console.log("For loop iteration:", i);
  }
  
  // While loop
  let count = 0;
  while (count < 3) {
    console.log("While loop iteration:", count);
    count++;
  }
  
  // Do-while loop
  let x = 0;
  do {
    console.log("Do-while iteration:", x);
    x++;
  } while (x < 2);
  
  // For...of loop (for arrays)
  const fruits = ["apple", "banana", "cherry"];
  for (const fruit of fruits) {
    console.log("Fruit:", fruit);
  }
  
  // Break statement
  for (let i = 0; i < 10; i++) {
    if (i === 5) {
      console.log("Breaking loop at i =", i);
      break;
    }
    console.log("Current i:", i);
  }
  
  // Continue statement
  for (let i = 0; i < 5; i++) {
    if (i === 2) {
      console.log("Skipping iteration at i =", i);
      continue;
    }
    console.log("Processing i:", i);
  }`,
          explanation: "This example shows different types of loops in JavaScript. For loops use a counter, while loops check a condition before each iteration, and do-while loops execute at least once. The for...of loop is convenient for iterating over arrays. Break and continue statements provide additional control within loops."
        }
      ],
      exercises: [
        {
          title: "Sum Calculator",
          description: "Write a program that calculates the sum of all numbers from 1 to n."
        },
        {
          title: "Pattern Printer",
          description: "Create a program that prints a triangle pattern of asterisks."
        }
      ]
    },
    // Add more courses for other levels...
    {
      id: 5,
      levelId: 2,
      title: "Introduction to Arrays",
      content: `
        <h3>Understanding Arrays</h3>
        <p>An array is a data structure that stores a collection of elements, typically of the same data type. Arrays are ordered, meaning each element has a specific position (index) in the collection.</p>
        
        <h4>Array Properties</h4>
        <ul>
          <li><strong>Ordered:</strong> Elements maintain their order</li>
          <li><strong>Indexed:</strong> Elements are accessed by their position (index)</li>
          <li><strong>Dynamic:</strong> Arrays can grow or shrink in size (in most languages)</li>
          <li><strong>Homogeneous:</strong> Arrays typically store elements of the same type (though JavaScript allows mixed types)</li>
        </ul>
        
        <h4>Common Array Operations</h4>
        <ul>
          <li>Accessing elements by index</li>
          <li>Traversing arrays</li>
          <li>Adding/removing elements</li>
          <li>Searching for elements</li>
          <li>Sorting array contents</li>
        </ul>
      `,
      examples: [
        {
          title: "Working with Arrays",
          description: "Creating, accessing, and modifying arrays.",
          code: `// Creating arrays
  let numbers = [1, 2, 3, 4, 5];
  let colors = ["red", "green", "blue"];
  let mixed = [42, "hello", true, [1, 2]]; // Mixed types
  
  // Accessing elements (zero-based indexing)
  console.log(numbers[0]); // 1
  console.log(colors[1]); // "green"
  
  // Getting array length
  console.log(numbers.length); // 5
  
  // Modifying elements
  numbers[2] = 99;
  console.log(numbers); // [1, 2, 99, 4, 5]
  
  // Adding elements
  numbers.push(6); // Add to end
  console.log(numbers); // [1, 2, 99, 4, 5, 6]
  
  colors.unshift("yellow"); // Add to beginning
  console.log(colors); // ["yellow", "red", "green", "blue"]
  
  // Removing elements
  const lastNumber = numbers.pop(); // Remove from end
  console.log(lastNumber); // 6
  console.log(numbers); // [1, 2, 99, 4, 5]
  
  const firstColor = colors.shift(); // Remove from beginning
  console.log(firstColor); // "yellow"
  console.log(colors); // ["red", "green", "blue"]
  
  // Looping through an array
  for (let i = 0; i < colors.length; i++) {
    console.log(\`Color at index \${i} is \${colors[i]}\`);
  }
  
  // Using forEach
  colors.forEach((color, index) => {
    console.log(\`Color at index \${index} is \${color}\`);
  });`,
          explanation: "This example demonstrates the basics of working with arrays. It shows how to create arrays, access elements by index, modify values, add and remove elements, and iterate through arrays using different methods."
        }
      ],
      exercises: [
        {
          title: "Array Reversal",
          description: "Write a function that reverses the elements of an array without using built-in reverse methods."
        },
        {
          title: "Find Maximum",
          description: "Create a function that finds the largest number in an array of numbers."
        }
      ]
    }
  ];
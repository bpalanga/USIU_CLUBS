## What to start with
- this is a dote

1. Syntax
2. Variables
3. Data types
4. Conditions ( Control Structure)
5. Arrays and Built_in data strucute
6. Loops 
7. Functions
# Intermediate and Advanced PHP Challenges & Mini Projects

This collection of challenges and mini projects is designed to strengthen your PHP skills in the following core areas:

* Syntax
* Variables
* Data Types
* Conditions (Control Structures)
* Arrays & Built-in Data Structures
* Loops
* Functions

---

## 🌐 1. Syntax & Variables Challenge

### Challenge: Dynamic Sentence Builder

Write a script that creates grammatically correct English sentences using a combination of variables and concatenation.

#### Requirements:

* Declare at least 5 variables (noun, verb, adjective, etc.).
* Create at least 3 unique sentences using those variables.
* Output all sentences.

### Bonus:

* Allow random selection from multiple nouns/verbs/adjectives.

---

## 📊 2. Data Types Challenge

### Challenge: Type Juggler

Create a function that accepts mixed types and returns their interpreted types.

#### Requirements:

* Define an array with elements of different data types (int, float, string, bool, null).
* Loop through and display the value and its type using `gettype()`.
* Try to cast each element to a different type and display the result.

---

## 🔀 3. Control Structures Challenge

### Challenge: Grading System

Build a system that takes a student's score and outputs their grade.

#### Requirements:

* Use `if-elseif-else` to define grade boundaries (A, B, C, D, F).
* Include input validation to reject negative scores or scores above 100.

---

## 📦 4. Arrays & Built-in Structures Challenge

### Challenge: Inventory Manager

Simulate a basic product inventory using associative and multidimensional arrays.

#### Requirements:

* Store at least 5 products, each with name, price, and stock.
* Create functions to:

  * Add a new product
  * Update stock
  * Calculate total inventory value
* Display the inventory in a readable format.

---

## 🔁 5. Loops Challenge

### Challenge: Pattern Generator

Write a script that creates these patterns using nested loops:

#### Example Output:

```
*
**
***
****
*****
```

### Bonus:

* Generate a multiplication table (1–12).

---

## 🔧 6. Functions Challenge

### Challenge: Custom Math Library

Create your own math library with the following functions:

* `add($a, $b)`
* `subtract($a, $b)`
* `multiply($a, $b)`
* `divide($a, $b)` (handle divide-by-zero)
* `power($a, $b)`

### Bonus:

* Create a `calculate()` function that takes a string like `"2 + 5"` and evaluates it using your custom library.

---

## 🧠 Mini Project: Student Portal CLI

Build a simple command-line PHP app that allows a student to:

* View subjects and grades (associative arrays)
* Calculate GPA (using loops and conditions)
* Add or remove subjects
* Export their report card as a string

#### Features to implement:

* Modularize code using functions
* Error checking for empty subjects, invalid grades
* Use switch-case for menu navigation

---

## 📁 Mini Project: Budget Tracker Web App (Intermediate-Advanced)

**Stack:** PHP + HTML (No database required)

### Features:

* Add, view, and delete transactions (use arrays)
* Categorize income/expenses
* Calculate balance and total expenses
* Use functions to separate logic

---

## 🧮 Mini Project: Calculator (Advanced)

Create a web-based calculator that supports:

* All basic operations (functions)
* Operation history (stored in arrays)
* Input validation (control structures)
* Optional: Use sessions to persist history between requests

---

## 🏫 USIU Web Events App - PHP-Aligned Challenges

These challenges are designed around the **USIU Club Events App** idea and directly map to key PHP concepts.

### 🔹 Challenge 1: Club Registration Handler

**Topics:** Syntax, Variables, Conditions

* Capture club details: name, category, contact person.
* Validate input (non-empty, valid name format).
* Store data in an associative array.

### 🔹 Challenge 2: Event Poster Generator

**Topics:** Data Types, Arrays, Strings

* Create a function that accepts event data and returns a formatted HTML event card.
* Use arrays to hold multiple events.
* Loop through to generate multiple event cards.

### 🔹 Challenge 3: Event Filter System

**Topics:** Loops, Conditions, Arrays

* Create an array of events.
* Filter based on event type or date.
* Output only upcoming or specific-category events.

### 🔹 Challenge 4: Comment Moderation Tool

**Topics:** Functions, Conditions

* Build a function to scan and flag inappropriate words in student comments.
* Censor words like "stupid", "damn", etc.

### 🔹 Challenge 5: Registration Counter

**Topics:** Loops, Arrays, Functions

* Track student registrations.
* Store registrants in an array.
* Create functions to count total, filter by event, or export list.

### 🔹 Challenge 6: Simple Email Notification Logger

**Topics:** Strings, Functions, Arrays

* Mimic email sending by logging to a file or printing to screen.
* Include student name, event name, and a message.

### 🔹 Challenge 7: Event Dashboard Summary

**Topics:** Loops, Arrays, Functions

* Create a function that shows a summary:

  * Total events
  * Total registered users
  * Event with highest registrations

---

🔥 These tailored challenges are great practice for nailing the Summer 2025 mini-project — while deepening your core PHP skills.

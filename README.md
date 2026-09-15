# Hyde

Hyde is a markdown website hosting stack that allows you to turn markdown files into websites

The stack is a monolithic combination of a web server, caching service, markdown to html translator, embedable DSL scripting language and a database

The source is written in pure vanilla JavaScript with a philosophy of writing everything from scratch to avoid heavy libraries

It implements a custom markdown format into which scripts can be embeded together with other custom tags making those markdown files a standalone websites

## Runtime

Bellow is a short explanation of how Hyde processes markdown files

## Architecture

Bellow is a scheme of how the individual modules are connected to each other inside of the stack

```mermaid
graph LR

A[Hyde]
B[Garbage Collector]
C[Hawk]
D[loCache]
E[Mytharis]
F[workerPool]
G[Fractal]
H[Marker]
I[systemLog]
J[CoreTools]
K[MemoryManager]
L[Hyde Runtime]

L --> A

A --> B
A --> C
A --> I

C <--> D
C <--> E
C <--> F

D <--> H

H <--> G

F <--> G

G <--> J
G <-->  K
```

### Explanation

1. Hyde Runtime starts an instance of Hyde

2. Hyde runs the Garbage Collector script and starts systemLog service

3. Hyde settups an instance of Hyde with vairables from the .env file

4. Hawk creates an instance of loCache, Mytharis and workerPool

5. loCache caches files and uses Marker to translate markdown to html

6. Marker translates markdown to html and uses Fractal to compile the embeded Fractal code

7. workerPool uses workers that assemble html responses that contain the result of interpreted Fractal code

8. Fractal both compiles and interprets Fractal code and imports coreTools together with MemoryManager

9. coreTools is first of the core libraries of Fractal that manages IO among other things

10. MemoryManager is the second core library of Fractal that manages virtual memory

## Components

### Hyde Runtime

Run is a custom wrapper script that allows you to run individual parts of the project easily

### Hyde

Hyde starts the individual modules of the stack

It also runs Garbage Collector before execution and start systemLog

### Hawk

Hawk is a custom web server and a core component of the stack

The main loop is single threaded to avoid complex mutex states

However it utilises worker pool to handle assembling html responses

### LoCache

LoCache is a simple caching services that allows Hawk to cache needed files in RAM instead of loading them from drive

It allows defining an initial cache configuration of files that are to be cached on startup of Hyde

It also features file statistics checks which allow the cache to recache updated files

In terms of markdown it allows caching from html and fsc files skiping the compilation process

### Fractal

Fractal is a custom DLS scripting language inspired by Python, JavaScript and NumScript

The code of Fractal is split into code blocks in which each statement is a function

It's source code is compiled into bytecode which is then interpreted inside of a virtual machine

Inside of Hyde it follows a PHP philosophy of scripts running entirely on the server side

### Marker

Marker is a markdown to html translator script

It supports basic GitHub markdown together with custom Marker tags

It also allows defining css, title or icon directly inside of the markdown file

### Mytharis

The future database like persistant storage of the stack that is yet to be implemented

## Support scripts

### Garbage Collector

Tool that deletes left over files after user deletes the original markdown file
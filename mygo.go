package main

import "fmt"

// Function definition
func greet(name string) string {
    return "Hello, " + name
}

// Struct definition
type Person struct {
    Name string
    Age  int
}


// Method on struct
func (p Person) Greet() string {
    return "Hello, my name is " + p.Name
}

func main() {
    fmt.Println(greet("John"))

    person := Person{Name: "Alice", Age: 30}
    fmt.Println(person.Greet())
}



// Define a struct
type Person struct {
    Name string
    Age  int
}

// Define a method on the struct
func (p Person) Greet() string {
    return "Hello, my name is " + p.Name
}

func main() {
    person := Person{Name: "Alice", Age: 30}
    fmt.Println(person.Greet())
}

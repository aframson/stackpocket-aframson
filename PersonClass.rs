impl Person {
    fn new(name: String, age: u8) -> Person {
        Person { name, age }
    }

    fn greet(&self) -> String {
        format!("Hello, my name is {}", self.name)
    }
}

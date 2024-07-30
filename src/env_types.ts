type Bindings = {
    [key in keyof CloudflareBindings]: CloudflareBindings[key]
  }
  
  type Env = {
    Bindings: Bindings
  }

export { Bindings, Env }
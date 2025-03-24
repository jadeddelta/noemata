

pub struct Parameter {
    pub name: String, 
    pub data_type: String,
    pub description: String, 
    pub value: Option<String>,
    pub default: Option<String>,
    pub required: bool,
}

impl Parameter {
    pub fn new(name: String, data_type: String, description: String, value: Option<String>, default: Option<String>, required: bool) -> Self {
        Self {
            name,
            data_type,
            description,
            value,
            default,
            required
        }
    }

    pub fn set_parameter_value(&mut self, value: String) {
        self.value = Some(value);
    }
}
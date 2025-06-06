use crate::parameter::Parameter;

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct PluginData {
    pub name: String,
    pub origin: String,
    pub version: Option<String>,
    pub author: Option<String>,
    pub description: Option<String>,
    pub parameters: Vec<Parameter>,
}

impl PluginData {
    pub fn new(
        name: String,
        origin: String,
        version: Option<String>,
        author: Option<String>,
        description: Option<String>,
    ) -> PluginData {
        PluginData {
            name,
            origin,
            version,
            author,
            description,
            parameters: Vec::new(),
        }
    }

    pub fn update(
        &mut self,
        version: Option<String>,
        author: Option<String>,
        description: Option<String>,
    ) {
        self.version = version;
        self.author = author;
        self.description = description;
    }

    pub fn add_parameter(&mut self, parameter: Parameter) {
        self.parameters.push(parameter);
    }

    pub fn set_parameter(&mut self, name: String, value: String) {
        for parameter in &mut self.parameters {
            if parameter.name == name {
                parameter.set_parameter_value(value.clone());
            }
        }
    }

    pub fn to_json(&self) -> String {
        let mut s = format!("{{\"name\": \"{}\"", self.name);
        if let Some(version) = &self.version {
            s.push_str(&format!(", \"version\": \"{}\"", version));
        }
        if let Some(author) = &self.author {
            s.push_str(&format!(", \"author\": \"{}\"", author));
        }
        if let Some(description) = &self.description {
            s.push_str(&format!(", \"description\": \"{}\"", description));
        }
        // s.push_str(", \"parameters\": [");
        // for (i, parameter) in self.parameters.iter().enumerate() {
        //     s.push_str(&parameter.to_json());
        //     if i < self.parameters.len() - 1 {
        //         s.push_str(", ");
        //     }
        // }
        // s.push_str("]");
        s.push_str("}");
        s
    }

    pub fn to_string(&self) -> String {
        let mut s = format!("{}: ", self.name);
        if let Some(version) = &self.version {
            s.push_str(&format!("version: {}, ", version));
        }
        if let Some(author) = &self.author {
            s.push_str(&format!("author: {}, ", author));
        }
        if let Some(description) = &self.description {
            s.push_str(&format!("description: {}, ", description));
        }
        s
    }
}

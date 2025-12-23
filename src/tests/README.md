## Automated Testing Overview

### Folder Structure

```sh
├── test/                   
│   ├── factories/          
│   ├── integration/        
│   ├── repositories/       
│   ├── setup/              
│   └── unit/               
│
```

This folder contains all automated tests for the project. It is structured to separate **unit tests**, **integration tests**, and **test helpers** for maintainability and clarity.

> [!TIP]
> A quick tip to help you understand and work with this project more easily.

1. Use factories to generate test data instead of hardcoding values.
2. Keep unit tests fast and isolated.
3. Use integration tests to validate real interactions with services, repositories, or APIs.
4. Separate tests clearly to improve maintainability and debugging


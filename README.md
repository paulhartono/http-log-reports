# http-log-reports

This a programming task solution based on the _requirement_ described in [./requirements.pdf](requirements.pdf)

## Assumptions

This task is done with assumptions to meet the requirement above with a bare minimum working state. The following are assumptions for the task

1. Describing the thought process in approaching the solution (part of this readme)
2. Readable code (breaking code into small task, with included comments)
3. Passing test
4. README that includes assumptions and instructions
5. This project is built on nodejs **v20.12.0** with typescript to ensure type safety
6. Input file is hardcoded within the implementation, ideally this should not be the case for production code
7. No docker options to run this project at this stage
8. There are some auto generated, or copy pasting to generate some boiler plate in this project which the content might not be necessary for this project in particular (eg: gitignore, config files)
9. Project structure may not be suitable for production based project

## How to run

1. clone this repository

```
git clone https://github.com/paulhartono/http-log-reports.git .
```

2. Install dependencies

```
npm i
```

3. Run code (in dev)

```
npm run dev
```

4. Run test

```
npm test
```

5. (Optional) Run test coverage

```
npm run coverage
```

6. (Optional - this is to simulate of what it would be like for prod) Run for production

```
npm run build
npm start
```

## Thought Process

When given the requirement, what comes to my mind to break this down to few requirements:

1. How we could understand and parse the log into meaningful data (ip address and url path). We need to check if the logs are consistent, is there patterns in the log that hinder us to get ip address and url path in a consistent manner
2. Once we got the data, what are some ways to produce the reporting requirement:

- unique IP address: this can be solved by putting ipaddress in a "Set", as "Set" let us store unique values no matter how many times we insert duplicates
- top 3 visited urls / active IP: this can be solved by storing a key value pair object, or dictionary in other language such as C#. In javascript land we could use Map, or in typescript Record utility would do. The "key" would be the url, or the ipaddress, and we can set the "value" as the counter itself

3. Now that with step 1 and 2 above we address the requirement, the next step is to optimise it. Is there a way we can optimise the solution? the approach I'm taking are as follows:

- Rather than doing step 2 after we finish the whole reading of the logs, we could actually do the "indexing" process at the same time. This saves the memory space
- I realised storing unique IP address in a set is a bit redundant in here, as that could also be solved by checking the size of the map object

4. Let's start by writing the unit function and create some test file
5. Put it all together in `index.ts` file

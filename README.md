# Project Name

Abibas SDC

Abibas is a recreation of Adidas that designs and manufactures shoes, clothing, and accessories. Abibas is created using React, MySQL, Node, and Express. The SDC portion consists of generating millions of primary records of data and loading it into two different databases and comparing the results, as well as doing the same for all of my teammates' components in a proxy.

## Related Projects

  - TBD
  - TBD

## Table of Contents

1. [CRUD API Endpoints](#CRUD)
1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## CRUD API Endpoints
---
#### Related "LOOKS" Module

`GET` /looks/:id   - Get a "looks" record with the specified ID

`POST` /look  (+ Post Object)  - Create the object if it doesn't exist, update it if it does

`DELETE` /looks/:id  - Delete a "looks" record with the specified ID

#### Parameters

| Name        | Type                | Description                                                |
|-------------|---------------------|------------------------------------------------------------|
| Look ID     | integer             | Id of this "look" and the related shoe                     |
| Post Object | JSON "looks" object | A raw jason "looks" object passed in with the POST request |
|             |                     | (Updates to a record can contain just the fields to update)|

---


## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

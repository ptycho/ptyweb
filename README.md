# PtyWeb - a web based viewer for ptychography

## Overview

PtyWeb is a collection of tools for visualizing ptychography data. It is made
up of three parts:

- **@ptyweb/lib** - a set of components (most of which are built on top of
  [@h5web/lib](https://github.com/silx-kit/h5web/tree/main/packages/lib))
  for visualizing ptychography data. This is a standalone package so that it can be
  used in any React app.
- **@ptyweb/app** - a React app that uses the components from `@ptyweb/lib` to
  provide a web-based viewer for [PtyPy](https://github.com/ptycho/ptypy)
  ptychography data.
- **@ptyweb/backend** - a Python package coded using
  [FastAPI](https://fastapi.tiangolo.com/) that provides a REST API for
  fetching data from PtyPy. This is used by @ptyweb/app to fetch data.

## Installation

There are 2 installation methods, however the steps below are required for both.


1. Clone the repository:

```bash
git clone https://github.com/ptycho/ptyweb.git
```

2. Installing the frontend dependencies:

First we need to build @ptyweb/lib. These steps are temporary until we make a npm package.
```bash
cd ptyweb/packages/lib
npm install
npm run build
```

```bash
cd ptyweb/packages/app/frontend
npm install
```

You now have some options on how to install the PtyWeb backend

### Installing PtyWeb backend into the PtyPy environment (recommended)

To complete these steps, please ensure that you have installed PtyPy and created an environment for it
(see [PtyPy's installation instructions](https://ptycho.github.io/ptypy/rst/getting_started.html#installation))

1. Activate the PtyPy environment (see [PtyPy's installation instructions](https://ptycho.github.io/ptypy/rst/getting_started.html#installation))
2. Install the PtyWeb backend into the PtyPy environment:

```bash
cd ptyweb/packages/app/backend
conda env update --name your_ptypy_env --file environment.yml
```

3. You should now be good to go 🎉, try following the [Usage](#Usage) instructions below.

### Installing PtyWeb backend into a separate environment (development)

1. Create new environment and install dependencies:
```bash
cd ptyweb/packages/app/backend
conda env create -f environment.yml
conda activate ptyweb
```

2. Install PtyPy and its dependencies into the `ptyweb` environment
(see [PtyPy's installation instructions](https://ptycho.github.io/ptypy/rst/getting_started.html#installation))

**When installing PtyPy, make sure to install the conda dependencies into the
`ptyweb` environment, instead of creating a new environment**

Example:
```bash
cd ptypy
conda activate ptyweb # If not already activated
conda env update --name ptyweb --file your_ptypy_env.yml
pip install .
```

3. You should now be good to go 🎉, try following the [Usage](#Usage) instructions below.

## Usage

### Frontend

1. Start the development server:

```bash
cd ptyweb/packages/app/frontend
npm run start
```

2. Open the app in your browser at http://localhost:3000.

### Backend

1. Make sure that the correct environment is activated (see [Installation](#Installation))
2. Start the development server:

```bash
cd ptyweb/packages/app/backend
uvicorn app:app --reload
```

# Notes to self

## Functions

### Logging

- Log should have permission indicator to limit who can view them

### Permission

- Permission should start from 0 and count up, where 0 indicates highest permission level (ie. head admin)
  - Negative permission level indicates guest level, which is the lowest permission level, even below positive infinity
- User can assign any permission level below them (ie. bigger number of permission) to any data
- Permission should be implemented as a programmed data behaviour rather than built-in feature for flexibility

## Data structure

- "behaviour" in field decides how data shows up for clients based on the data stored within
  - This is how permission and data visibility control would work
- "_default" is a special variable that applies certain properties to all data within the same level and below

### Possible use cases

## Commands

- For GPG signing

```
export GPG_TTY=$(tty)
git commit -S -m ""
```

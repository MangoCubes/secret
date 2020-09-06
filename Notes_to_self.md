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
- "Visibility" indicates who can view this data
  - "Self" indicates that only the creator can view the data
  - Any number higher than the creator's permission level represents the permission level required to view the data
    - This number cannot be set higher than the creator's level
- Every identification number starts with 1

### Possible use cases

## Caddy setup

```
https://domain.com {
        reverse_proxy secretarchive:443 {
                transport http {
                        tls_insecure_skip_verify
                }
        }
}
```

## Commands

- For GPG signing

```
export GPG_TTY=$(tty)
git commit -S -m ""
```

## Additional notes

- Make smaller commits

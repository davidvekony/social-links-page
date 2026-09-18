# Social Links Page

A single static profile card: who the person is, where to find them online, and how the page is built.

## Language

**Profile**:
The content of the page as one object — who the person is (name, avatar) and their Links. The interface of the profile page module.
_Avoid_: config, settings, data file

**Link**:
One destination on the profile card: a label, a URL, and how it is visually represented (network icon, optional colour, optional highlight).
_Avoid_: social, button, entry

**Highlight**:
A visual emphasis applied to one Link, signalling it is preferred over the others (e.g. Buy Me A Coffee).
_Avoid_: special case, featured, colour override

**Profile page**:
The module that renders a Profile. Header, Links list, and Footer are its implementation, not its interface.

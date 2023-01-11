# Aryeo React Native Demo Project

Completed iOS version.  I am getting a conditional rendering error that is preventing me from running android.  I would continue to trouble shoot, but I don't have the time this evening.  I believe it is just a string that's being misread as a boolean somewhere, but my stack trace didn't give me much to go off.

Overall very happy with how it has come together on the iOS though.  There were features that I would have really liked to add if I had more time.  One is a filter that just splices titles to find employee names then lets you filter by employee.  The second is to change the state management to a global state for cleaner storage and manipulation.  Third would have been a monthly calendar layout for the events.

Overall I put about 7 hours into this, frustrated with the android not working, but I just don't have the energy to run it down tonight.  The code is uncommented and there is definitely some in-line styling.  I tried to use descriptive variable names so it wouldn't be too hard to follow.

As far as dependencies go- I used react navigation, the community date picker, and the expo vector icons package.  Tried to keep it light weight.  I prefer using a different date picker (react-native-date-picker) because it integrates plug and play with android. Since I wasn't able to get the android pulled up on my simulator due to the type error I didnt implement this date picker yet for the rescheduling.

If you guys have any questions at all I would be more than happy to go over the code, I would have liked to comment more and would if this was a production piece of software, it just took longer than I anticipated to work the kinks out.  

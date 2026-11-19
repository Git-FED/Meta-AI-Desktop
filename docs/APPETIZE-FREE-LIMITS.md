# Appetize Free Limits — Chat Summary

The supplied chat described the Appetize dashboard as showing **5 of 30 minutes used**, leaving **25 minutes**, with a reset on Dec 1.

## What the minutes mean

- They are the monthly Appetize streaming budget.
- They count while an Appetize Android session is actively running.
- They do not delete the uploaded build.
- They do not affect an APK installed directly on a physical phone.
- They do not pay for or limit Electron itself.
- The Electron wrapper still consumes Appetize minutes because it opens the Appetize session.

## What happens at zero

The chat says the Play URL is not killed. It remains in the Appetize dashboard, but it will not start a new session when the monthly allowance is exhausted. It becomes usable again after the reset or after upgrading the Appetize plan.

The supplied chat also says free sessions cap at roughly 3 minutes each. Closing the active session is the way to stop the current session clock; merely leaving the URL open does not preserve the minutes.

## Standalone versus wrapper

A locally installed APK is a real device app and does not need Appetize. This project is different: it is an Electron wrapper around a remote Appetize Play URL, so it requires Appetize and internet access when launched.

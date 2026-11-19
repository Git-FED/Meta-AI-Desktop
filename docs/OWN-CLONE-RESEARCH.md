# Own Appetize-Style Clone — Research Notes

These notes preserve the conclusions in the supplied chat. They are documentation only; this project does not attempt to run an Android emulator server.

## Bottom line

The code can be written for free, but running a full Appetize-style service long-term is not free in the verified scenario described by the chat.

A full service needs:

1. APK upload and storage.
2. Per-link build/session provisioning.
3. A real Android runtime.
4. Browser streaming, typically through WebRTC or a similar pipeline.
5. Session cleanup and isolation.
6. Authentication, quotas, and sharing.

## Infrastructure constraints from the chat

- A real Linux host with KVM was described as the practical baseline.
- The cited minimum was roughly 4 vCPU, 8 GB RAM, and 80 GB SSD.
- Cloudflare Workers were ruled out because they provide isolates, not KVM-backed emulator hosts, and are too small for this workload.
- GitHub Actions is not a persistent runtime.
- Static hosting such as Pages does not run the emulator.
- Free cloud tiers checked in the chat were either too small, lacked nested virtualization, or were not suitable for privileged emulator containers.
- A home PC was the only $0 long-term runtime identified in those notes, but it still has electricity and maintenance costs.

## Projects mentioned

- Tapflow: described as a self-hosted alternative requiring Mac agents; a public share-link flow was not confirmed.
- `android-emulator-platform`: closest mechanics, but the chat notes Android 11, KVM requirements, and missing product layers.
- `docker-android` and `redroid`: building blocks, not complete upload/share/WebRTC products.
- STF: intended for real devices.
- Waydroid: desktop-oriented and not a browser-streaming solution.
- Anbox: described as dead at Android 7.1.1.
- Anbox Cloud: higher infrastructure requirements and an Ubuntu Pro gate.
- MyAndroid / ApkOnline: described as free but Android 8 only, without a shareable link, so not suitable for this Meta AI build.
- ADBKit: described as a useful free route for mirroring a physical phone over USB, but it is not a cloud emulator or share-link service.

## Practical conclusion

For this desktop project, wrapping the Appetize Play URL is the straightforward route. A true clone would be a separate infrastructure product, not a small Electron wrapper.

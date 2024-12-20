# Simulators/Devices

- iOS list all available simulators

  ```sh
  xcrun simctl list devices

  # You need to install unavailable simulators in xcode->Settings->Platforms
  -- Unavailable: com.apple.CoreSimulator.SimRuntime.iOS-15-0 --
    iPhone 12 Pro Max (30104B3A-081C-48B8-932F-FB249E692066) (Shutdown) (unavailable, runtime profile not found)
  ```
- iOS run a specific simulator
  ```
  yarn ios --simulator "iPhone 12 Pro Max"
  ```
- android list devices
  ```sh
  adb devices
  ```

# Device Databases

- realm
- SQLite:
  - [op-sqlite - fastest in 2024](https://github.com/OP-Engineering/op-sqlite)
  - [op-sqlcipher]()
  - [Original]()
  - [expo](https://docs.expo.dev/versions/latest/sdk/sqlite/)
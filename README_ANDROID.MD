# build local (android studio and simulator neede)
npx expo run:android --variant release 
cd ./android
./gradlew assembleDebug
ls ./app/build/outputs/apk/

# submit job on eas:
eas build -p android --profile preview
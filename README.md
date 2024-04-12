# Firebase Authentication POC
Firebase authentication POC using Angular in the front-end, and Spring Boot in the back-end

# Frontend
I followed [this youtube video](https://youtu.be/586O934xrhQ) to create this angular project. [Source GitHub Ref](https://github.com/monsterlessonsacademy/monsterlessonsacademy/tree/440-angular-firebase-authentication)

This frontent implements email-password based sign-in and sign up into the application. Also, we show how to extract the idToken and use it for making requests to the backend (check `user.service.ts`).
You'll need to supply correct firebase config in the `app.config.ts` file for this example to work.

# Backend
The backed code is very basic, to I'll just add snippets. Before setting it up, you'll need to generate a service account private key json (from project settings in your firebase project) and place it in the `src/main/resources/` directory.
### Add Firebase admin SDK Dependency
```
<!-- https://mvnrepository.com/artifact/com.google.firebase/firebase-admin -->
<dependency>
    <groupId>com.google.firebase</groupId>
    <artifactId>firebase-admin</artifactId>
    <version>9.2.0</version>
</dependency>
```

### Initialize firebase admin
```
@Configuration
public class FirebaseConfig {

    @Value("classpath:test-xxxxxxxx-firebase-adminsdk-xxxxxxxxx.json") // This is the private key of the service account
    private Resource resource;

    @PostConstruct
    public void initializeApp() {
        try {
            InputStream inputStream = resource.getInputStream();
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(inputStream))
                    .build();
            FirebaseApp.initializeApp(options);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
```

### Verify authToken received in the headers
```
    @GetMapping("/user")
    public String verifyUser(@RequestHeader(name = "Authorization") String token) throws Exception {
        FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
        String uid = decodedToken.getUid();
        String email = decodedToken.getEmail();
        System.out.println("Extracted user: " + uid + " - " + email );
        return email;
    }
```

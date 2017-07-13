# ts-annotations
[![Build Status](https://travis-ci.org/gejustin/ts-annotations.svg?branch=master)](https://travis-ci.org/gejustin/ts-annotations)

Library for mapping anonymous JS objects into instances of TypeScript classes. Inspired by [Jackson Annotations](https://github.com/FasterXML/jackson-annotations). Implementation details have diverged quite a bit from what Jackson offers, but hopefully if you're familiar with it, this will be useful to you in a JavaScript context.

**Notes:**
  1. This documentation is currently under development.
  2. Public API has potential to change. Since the API has diverged from Jackson Annotations, it no longer makes sense to maintain the same naming for classes/methods/decorators. Deprecation of existing names is likely but we should be able to make it a non-breaking change until they're removed in a future version.

# Table of Contents

  * [Installation](#installation)
  * [High Level Overview](#high-level-overview)
  * [Usage](#usage)
    + [ObjectMapper](#objectmapper)
    + [Class Decorators](#class-decorators)
        - [JsonProperty](#jsonproperty)
  * [Advanced Usage](#advanced-usage)

  ## Installation

1. Install module:

    `npm install ts-annotations --save`

2. Its important to set these options in `tsconfig.json` file of your project:

    ```json
    {
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true
    }
    ```

  ## High Level Overview:
  ts-annotations is designed to assist with mapping anonymous objects to classes.

  Imagine we had an anonymous source object that looked like this:

  ```JavaScript
     {
         accountDetails: {
             user: {
                 name: "John Snow",
                 age: "30",
             },
             email: "doesntknowmuch@somedomain.com",
         }
     }
  ```

  In our application we want to use a more streamlined object, get some type hinting and make sure our view does not explicitly depend on the shape of the source object we received from some outside database or API (because we know how to code for boundaries).

  So we draft up a class to model this data for our application:

  ```TypeScript
  class User {

      public name: string;

      public emailAddress: string;

      public age: number;
  }
  ```

  Normally we would require some code that manually maps properties from the source object to the public fields of the class.

  ```TypeScript
  const user = new User();

  user.name = source.accountDetails.user.name;
  user.age = source.accountDetails.user.age;
  user.emailAddress = source.accountDetails.email;
  ```

  Seems simple enough right? But we all know what happens when any property in that lookup is undefined or null - we get a `TypeError`. In some cases, the unmapped data may need to be cast because you have a string when you want a number. Again, not hard to do, but it takes some boilerplate, error handling, and code duplication that clutters the code.

  ```TypeScript
  const user = new User();

  // Let's assume at least source is defined
  if (source.accountDetails) {

      if (source.accountDetails.user) {
        user.name = source.accountDetails.user.name;
        user.age = +source.accountDetails.user.age;
      }

      user.emailAddress = source.accountDetails.email;
  }
  ```

  Alright, we've eliminated those potential type errors, and have casted age to a number, and the code isn't too bad. But what if any of those values are undefined and you want to provide a default value?

  ```TypeScript
  const user = new User();

  // Let's assume at least source is defined
  if (source.accountDetails) {

      if (source.accountDetails.user) {
        user.name = source.accountDetails.user.name || 'Jason Bourne';
        user.age = +source.accountDetails.user.age || 30;
      }

      user.emailAddress = source.accountDetails.email || 'jason.bourne@somedomain.com';
  }
  ```

  At this point, it's still not THAT bad, but in the real world objects are more complicated and have deeper nested structures. As developers, we'd prefer to access top level properties and add custom types for some of these as well (not everything is a string or number).

  The goal of this library is to help make those sorts of things simpler and reduce clutter.

  By using the decorators provided in this library with your class, we can clean up the above. We will need to update our class definition to tell the `ts-annotations` library where it can find these properties on our json object.

  ```TypeScript
  import { JsonProperty } from 'ts-annotations';

  class User {

      @JsonProperty('accountDetails.user.name')
      public name: string = 'Jason Bourne';

      @JsonProperty('accountDetails.email')
      public emailAddress: string = 'jason.bourne@somedomain.com';

      @JsonProperty('accountDetails.user.age')
      public age: number = 30;
  }
  ```

  By decorating these fields, we're telling the `ts-annotations` library the path where the value we want is located on the source object. In addition, the type of the field tells it what type we expect it to be or that we want it to be casted to. If they don't exist, or if an error is thrown, it will use the default value provided in the field declaration. This works with custom types as long as those classes also have been decorated and `ts-annotations` can deserialize them. So the next step is to actually create our new `User` object.

  You'll also notice the the syntax for providing paths is based off of normal JavaScript property accessors. There is also support for accessing array indexes and object keys using dynamic values, examples will be provided in the [Advanced Usage](#advanced-usage) section.

  ```TypeScript
  import { ObjectMapper } from 'ts-annotations';

  const mapper = new ObjectMapper(); // Provided by your favorite DI Container of course.
  const user = mapper.readValue<User>(source, User);
  ```

  The generic method type isn't necessary, but it tells TypeScript what the type of the return value is, otherwise it returns the `any` type. So essentially, we're telling the TypeScript compiler that my local variable user is of type `User` and not `any`. Now when I try to access properties on user, I will get intellisense and code completion for an object of type `User`.

  ## Usage

  If you've made it this far, you're probably looking for some more information that will help you map your object.

  ### ObjectMapper

  The ObjectMapper class provides a single method for converting anonymous objects to an instance of your class.

  `readValue<T>(source, typeReference, constructorArgs): T`

  In general, readValue takes your object to be mapped from as the first argument, and the annotated class as the second.

  ```TypeScript
  import { ObjectMapper } from 'ts-annotations';

  const mapper = new ObjectMapper(); // Provided by your favorite DI Container of course.
  const user = mapper.readValue<YourClassType>(source, YourClassType);
  ```

   A 3rd parameter is available for passing additional constructor arguments when the instance of your class is created.

  ```TypeScript
  import { ObjectMapper } from 'ts-annotations';

  const mapper = new ObjectMapper(); // Provided by your favorite DI Container of course.
  const user = mapper.readValue<YourClass>(source, YourClass, [YourClassContructorArg1, YourClassContructorArg2]);
  ```

  ### Class Decorators

  #### JsonProperty

  `JsonProperty` is the most common decorator you will need to use when creating your classes.

  `JsonProperty(path, options): void`

  In order to tell the [ObjectMapper](#objectmapper) where it can find a particular property's value in your source object you will need to give it a path.

  In general,

  ```TypeScript
  class SomeClass {

      @JsonProperty('path.to.value')
      public value: any;

  }
  ```
  Please look at our [examples][1] for code with more substance

  [1]: https://github.com/gejustin/ts-annotations/tree/master/examples
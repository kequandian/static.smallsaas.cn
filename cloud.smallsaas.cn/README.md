## 换掉UUID，更快更安全
https://mp.weixin.qq.com/s/KCha5jWGgR0SH1ISpfiTwQ

### 引入依赖（已添加到本项目）
在 `pom.xml` 中加入：

```xml
<dependency>
    <groupId>com.aventrix.jnanoid</groupId>
    <artifactId>jnanoid</artifactId>
    <version>2.0.0</version>
}</dependency>
```

### 基础用法
```java
import com.aventrix.jnanoid.jnanoid.NanoIdUtils;

String id = NanoIdUtils.randomNanoId(); // 默认长度 21
```

### 自定义字母表与长度（安全随机源）
```java
import com.aventrix.jnanoid.NanoIdUtils;
import java.security.SecureRandom;

SecureRandom random = new SecureRandom();
char[] alphabet = "ABCDEFG1234567890".toCharArray();
String id = NanoIdUtils.randomNanoId(random, alphabet, 10);
```

### Spring Boot 示例接口
```java
import com.aventrix.jnanoid.NanoIdUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Collections;
import java.util.Map;

@RestController
public class IdController {
  @GetMapping("/dev/nanoid")
  public Map<String, String> id() {
    return Collections.singletonMap("id", NanoIdUtils.randomNanoId());
  }
}
```

### JPA 实体主键使用 NanoID
```java
import com.aventrix.jnanoid.NanoIdUtils;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.PrePersist;

@Entity
public class User {
  @Id
  private String id;

  @PrePersist
  public void prePersist() {
    if (id == null) {
      id = NanoIdUtils.randomNanoId();
    }
  }
}
```

### 为什么选择 NanoID
- 更短：默认 21 字符，更省存储与传输成本
- 更快：生成速度优于 `UUID.randomUUID()`
- 更安全：使用加密随机源，分布更均匀
- 可定制：自由指定字母表与长度

更多说明参见上文链接。


package com.jfeat;


import com.jfeat.crud.plus.META;

import lombok.extern.slf4j.Slf4j;

// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * SpringBoot方式启动类
 *
 * @author Admin
 * @Date 2017/5/21 12:06
 */
@SpringBootApplication
@EnableSwagger2
@Slf4j
public class AmApplication extends WebMvcConfigurerAdapter {

    public static void main(String[] args) {
        META.enabledEav(true);
        META.enabledTag(true);
        SpringApplication.run(AmApplication.class, args);
        log.info("cloud.smallsaas.cn App is success!");
    }
}

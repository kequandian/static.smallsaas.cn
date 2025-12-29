package com.jfeat.nanoid.controller;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

/**
 * Nano ID Generator Controller
 */
@RestController
public class IdController {

    @GetMapping("/dev/nanoid")
    public Map<String, String> id() {
        return Collections.singletonMap("id", NanoIdUtils.randomNanoId());
    }

    // 仅生成数字ID
    @GetMapping("/dev/nanoid/id")
    public Map<String, String> numericId() {
        char[] alphabet = "0123456789".toCharArray();
        String id = NanoIdUtils.randomNanoId(NanoIdUtils.DEFAULT_NUMBER_GENERATOR, alphabet, 10);
        return Collections.singletonMap("id", id);
    }
}

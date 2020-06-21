package org.drive.controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.drive.models.Employee;
import org.drive.repositories.EmployeeRepository;
import org.drive.security.JwtProvider;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
public class AccessController {

    @Autowired
    private EmployeeRepository empRep;

    @Autowired
    private JwtProvider jwtProvider;

    @PostMapping(value = "/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> map) {
        Employee employee = empRep
                .findByLoginAndPassword(map.get("login"), map.get("password"));
        String token = jwtProvider.generateJwtToken(employee.getLogin());
        JSONObject answer = new JSONObject();
        answer.put("token", token);
        answer.put("user", employee.getName() + " " + employee.getSurname());
        answer.put("rights", employee.getRights());
        answer.put("id", employee.getId());
        return new ResponseEntity<>(answer.toString(), HttpStatus.OK);
    }
}

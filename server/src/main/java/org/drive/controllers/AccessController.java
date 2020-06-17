package org.drive.controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.drive.models.Employee;
import org.drive.repositories.EmployeeRepository;
import org.drive.security.JwtProvider;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class AccessController {

    @Autowired
    private EmployeeRepository empRep;

    @Autowired
    private JwtProvider jwtProvider;

    @PostMapping(value = "/login")
    public String login(@RequestBody Employee employee) {
        employee = empRep.findByLoginAndPassword(employee.getLogin(), employee.getPassword());
        String token = jwtProvider.generateJwtToken(employee.getLogin());
        JSONObject answer = new JSONObject();
        answer.put("token", token);
        answer.put("login", employee.getLogin());
        answer.put("rights", employee.getRights());
        return answer.toString();
    }
}

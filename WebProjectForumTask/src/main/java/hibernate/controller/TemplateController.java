package hibernate.controller;

import hibernate.service.interfaces.CRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/")
public class TemplateController {

    @Autowired
    private CRUDService crudService;

    @Autowired
    private MessageSource messageSource;

    @RequestMapping(value = "/topic", method = RequestMethod.GET)
    public String topic() {
        return "topic";
    }

}

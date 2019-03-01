package hibernate.controller;

import hibernate.dto.SubjectDTO;
import hibernate.dto.TopicDTO;
import hibernate.service.interfaces.BasicService;
import hibernate.service.interfaces.CRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.MessageSource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Controller
@RequestMapping("/")
public class MainController {

    @Autowired
    @Qualifier("topicService")
    private BasicService topicService;

    @Autowired
    @Qualifier("subjectService")
    private BasicService subjectService;

    @Autowired
    private MessageSource messageSource;

    @RequestMapping(value = "/blog/all/page{numberPage}", method = RequestMethod.GET)
    public String home(@PathVariable int numberPage) {
        return "home";
    }

    @RequestMapping(value = "/blog/{topicId}/page{numberPage}",method = RequestMethod.GET)
    public String topic(@PathVariable int topicId, @PathVariable int numberPage) {
        return "home";
    }

    @RequestMapping(value = "blog/all", method = RequestMethod.GET)
    public String homeAll(@RequestParam(value = "page", defaultValue = "1") int page,
                          @RequestParam(value = "size", defaultValue = "3") int size,
                          @RequestParam(value = "search", defaultValue = "") String search, Model model) {
        List<SubjectDTO> subjects = subjectService.getLikeNamePaginated(page,size,search);
        for (SubjectDTO subjectDTO : subjects) {
            subjectDTO.setText(subjectDTO.getText().split("\\.")[0] + ".");
        }
        int length = subjectService.getLikeName(search).size();
        model.addAttribute("title","All Subjects");
        model.addAttribute("subjects", subjects);
        model.addAttribute("lengthSubjects",length);
        return "home";
    }

    @RequestMapping(value = "blog/{topicId}", method = RequestMethod.GET)
    public String homeById(@PathVariable int topicId, @RequestParam(value = "page", defaultValue = "1") int page,
                           @RequestParam(value = "size", defaultValue = "3") int size,
                           @RequestParam(value = "search", defaultValue = "") String search, Model model) {
        List<SubjectDTO> subjects = subjectService.getCustomLikeNamePaginated(page,size,search,topicId);
        for (SubjectDTO subjectDTO : subjects) {
            subjectDTO.setText(subjectDTO.getText().split("\\.")[0] + ".");
        }
        TopicDTO topicDTO = (TopicDTO) topicService.getById(topicId);
        int length = topicDTO.getSubjects().size();
        String title = topicDTO.getTopicName();
        model.addAttribute("title",title);
        model.addAttribute("subjects", subjects);
        model.addAttribute("lengthSubjects",length);
        return "home";
    }


    @RequestMapping(value = "/post/{subjectId}", method = RequestMethod.GET)
    public String post(@PathVariable int subjectId) {
        return "post";
    }

    @RequestMapping(value = "/post/add", method = RequestMethod.GET)
    public String addPost() {
        return "post";
    }

    @RequestMapping(value = "/post/{subjectId}/update", method = RequestMethod.GET)
    public String updatePost(@PathVariable int subjectId) { return "post"; }

    @RequestMapping(value = "/admin", method = RequestMethod.GET)
    public String getAdmin() {
        return "admin";
    }


    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login() {
        return "login";
    }

    @RequestMapping(value="/logout", method = RequestMethod.GET)
    public String logoutPage (HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null){
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return "redirect:/login?logout";
    }

}
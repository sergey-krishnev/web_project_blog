package hibernate.service.implementations;

import hibernate.converter.DTOHelper;
import hibernate.dao.interfaces.BasicDao;
import hibernate.dto.SubjectDTO;
import hibernate.dto.TopicDTO;;
import hibernate.model.Subject;
import hibernate.model.Topic;
import hibernate.service.interfaces.BasicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service("topicService")
public class TopicServiceImpl<T> implements BasicService<TopicDTO> {

    @Autowired
    @Qualifier("topicDao")
    private BasicDao topicDao;

    @Transactional(readOnly = true)
    @Override
    public List<TopicDTO> getAll() {
        List<Topic> topicList = topicDao.getAll();
        List<TopicDTO> topics = new ArrayList<>();
        DTOHelper.topicToTopicDTO(topicList, topics);
        return topics;
    }

    @Transactional(readOnly = true)
    @Override
    public TopicDTO getById(int id) {
        Topic topic = (Topic) topicDao.getById(id);
        TopicDTO topicDTO = new TopicDTO();
        List<Subject> subjectList = topic.getSubjects();
        List<SubjectDTO> subjects = new ArrayList<>();
        DTOHelper.subjectToSubjectDTO(subjectList,subjects);
        topicDTO.setId(topic.getId());
        topicDTO.setTopicName(topic.getName());
        topicDTO.setSubjects(subjects);
        return topicDTO;
    }

    @Override
    public boolean getByName(String name) {
        return false;
    }

    @Transactional(readOnly = true)
    @Override
    public List<TopicDTO> getLikeName(String s) {
        List<Topic> topics = topicDao.getLikeName(s);
        List<TopicDTO> topicDTOList = new ArrayList<>();
        DTOHelper.topicToTopicDTO(topics, topicDTOList);
        return topicDTOList;
    }

    @Transactional(readOnly = true)
    @Override
    public List<TopicDTO> getLikeNamePaginated(int page, int size, String s) {
        List<Topic> topicList = topicDao.getLikeName(s);
        List<TopicDTO> topics = new ArrayList<>();
        DTOHelper.topicToTopicDTO(topicList, topics);
        int start = 0;
        start += (page-1) * size;
        int div = topics.size()/size;
        int mod = topics.size()%size;
        if (page-1 == div) return topics.subList(start,start + mod);
        if (start + size > topics.size()) return new ArrayList<>();
        return topics.subList(start, start + size);
    }

    @Transactional(readOnly = true)
    @Override
    public List<TopicDTO> getCustomLikeNamePaginated(int page, int size, String s, int id) {
        return null;
    }

    @Transactional
    @Override
    public void add(TopicDTO modelDTO) {
        Topic model = new Topic();
        model.setName(modelDTO.getTopicName());
        topicDao.add(model);
    }

    @Transactional
    @Override
    public void update(int id, TopicDTO modelDTO) {
        Topic model = new Topic();
        model.setName(modelDTO.getTopicName());
        topicDao.update(id,model);
    }

    @Transactional
    @Override
    public void delete(int id) {
        topicDao.delete(id);
    }


}

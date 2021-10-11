const GitHub = require('github-api');
const { validationResult } = require('express-validator');

const Repo = require('../models/repo');
const ProjectSettings = require('../models/project-settings');

const github_config = require('../config').github;
const github_client = new GitHub({
  username: github_config.username,
  token: github_config.token
});

exports.getSettings = (req, res, next) => {
  ProjectSettings.find()
    .then(settings => {
      res.status(200).json(settings);
    })
    .catch(err => {
      const error =  new Error(err);
      error.status = 401;
      error.msg = 'Unknown error occured.';
      return next(error);
    });
};

exports.postSettings = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      const error =  new Error('Invalid input.');
      error.status = 422;
      error.msg = 'Invalid input.';
      error.errors = errors.array();
      return next(error);
  }
  const settings = new ProjectSettings();
  settings.project_count = req.body.project_count;
  settings.save().then(() => {
      res.status(201).json({
        msg: 'Settings added successfully.',
        _id: settings._id
      });
    })
    .catch(err => {
      const error =  new Error(err);
      error.status = 401;
      error.msg = 'Unknown error occured.';
      return next(error);
    });
};

exports.putSettings = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      const error =  new Error('Invalid input.');
      error.status = 422;
      error.msg = 'Invalid input.';
      error.errors = errors.array();
      return next(error);
  }
  const settings = {
    project_count: req.body.project_count
  };
  ProjectSettings.updateOne({
      _id: req.body._id
    }, settings)
    .then(result => {
      res.status(200).json({
        msg: 'Github settings updated successfully.',
        result: result
      });
    })
    .catch(err => {
      const error =  new Error(err);
      error.status = 401;
      error.msg = 'Unknown error occured.';
      return next(error);
    });
};

exports.getRepos = (req, res, next) => {
  ProjectSettings.find()
    .then(settings => {
      const count = settings[0].project_count;
      Repo.find()
        .then(projects => {
          if (projects.length > 0) {
            res.status(200).json(projects.slice(0, count));
          } else {
            const me = github_client.getUser();
            return me.listRepos().then(repos => {
                let myRepos = repos.data;
                myRepos.sort((a, b) => (a.updated_at > b.updated_at) ? -1 : ((b.updated_at > a.updated_at) ? 1 : 0));
                let projects = [];
                for (i = 0; i < count; i++) {
                  projects.push(new Repo({
                    name: myRepos[i].name,
                    language: myRepos[i].language,
                    updated_at: myRepos[i].updated_at,
                    description: myRepos[i].description,
                    html_url: myRepos[i].html_url
                  }));
                }
                projects.forEach(project => {
                  project.save();
                });
                res.status(200).json(projects);
              })
              .catch(err => {
                const error =  new Error(err);
                error.status = 401;
                error.msg = 'Unknown error occured.';
                return next(error);
              });
          }
        })
        .catch(err => {
          const error =  new Error(err);
          error.status = 401;
          error.msg = 'Unknown error occured.';
          return next(error);
        });
    })
    .catch(err => {
      const error =  new Error(err);
      error.status = 401;
      error.msg = 'Unknown error occured.';
      return next(error);
    });
};

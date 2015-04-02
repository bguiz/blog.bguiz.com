---
layout: post
title: Open Source Project Stewardship
date: 2015-03-31 20:04
comments: true
tags: oss, software, steward, maintainer, lint, test, coverage, nodejs, github, travis, coveralls
---

- You have just embarked on your journey as an open source developer
- You have been contributing to open source projects for years

Whichever your scenario is,
it is always a good idea to pause and reflect upon whether
you are a good steward of the open source projects that you maintain,
or even just contribute to.

I started my journey in the pre-Github days,
where most open source projects were versioned using Subversion,
and Sourceforge was the main hub of collaboration.
I have not-fond memories of how slow and unusable the website was,
and resorting to creating diff-patches,
and emailing them to the maintainers.

Since then things have improved vastly,
in terms of the tools that were available.
Git supplanted Subversion as the de facto version control system,
and branching and merging became so much easier -
not to mention faster - to do.

Hot on the tails of git,
came Github, which made collaborative source code version control
that much more *accessible* and *user friendly*.
That was not the only tool to spring up though,
and other sites, which build on top of the popularity and ease of use of Github,
such as Travis and Coveralls have come up too.

Most of the open source software that I write now is in Javascript,
and the creation of NodeJs as a platform,
and the explosion in the richness of the packages available in npm,
its package manager,
has created a vibrant open source ecosystem,
that works great hand in hand with Github/ Travis/ Coveralls.

The concepts I cover below are applicable to most open source software.
The examples, however, will be specific to Javascript/ NodeJs.

## Continuous Integration

### Github

Github is a service which hosts your Git repositories,
for free if they are open source,
and for money if they are closed source.
It exposes a very easy to use web user interface (try it!)
for interacting with Git repositories.
You do not need to be a command line expert to do advanced Git things,
you can get very far within your browser alone.

Github is not just a Git host though.
It lends itself well to continuous integration,
as well as web hooks and APIs which allow it to integrate well other tools,
including Travis and Coveralls.

### Travis

Travis is a continuous integration system,
which is free for all open source projects hosted on Github -
with paid versions for closed source projects hosted anywhere, of course.

It integrates really easily into Github,
as it automatically detects whenever a branch or tag is pushed to a Github repository,
via web hooks,
and automatically triggers a build from it,
notifying you by email when a passing build fails,
a failing build continues to fail, and a failing build passes.

It is reliable, and reasonably fast to boot.

### Coveralls

Coveralls is not a continuous integration system,
but rather should be thought of as a "view"
for **code coverage** related build artefacts,
produced as a result of a continuous integration build.

Of course, we will use Travis to do the actual continuous integration builds,
and simply pass the relevant outputs it generates to Coveralls.

Its business model is similar to that of Travis -
free for all open source projects hosted on Github,
and paid for closed source projects hosted elsewhere.

## Linting

Open your wardrobe, and pull out a jacket
which you have not worn in a while.
When you wear it, you notice that it has these little bits of
grey fluff on it here and there.
So you pinch the ones that you see off of it, and throw them away.
Give it an hour, and you will be sure to notice more fluff,
that you'll have to pick off.
Does not really matter though,
you're still wearing your jacket,
and it more or less performs that same function it would
without the lint on it.
It would not make you look very good though.

### Software Linting

An analogous thing happens when writing software.
Sometimes the code that you write has errors in it
that are innocuous enough that they do not cause the software to break.
However, when there are too many of these,
things start to look ugly.
Sometimes they simply deceive the eye of the developer,
and reveal themselves only when put under express scrutiny,
flying under the radar most of the time.
They become a hindrance when collaboratively writing software
in a team, or with the broader open source community.

That is where linting tools come into play.
They programmatically analyse your source to identify
where these innocuous errors,
or violation of coding style guidelines have occurred,
and point out where they are, so that they may be addressed.

## Testing

Testing and coverage are closely related,
and the two go hand in hand.
In fact the latter cannot happen without the former.

Imagine that you are a school teacher,
and you are creating a quiz or test for your students,
and it consists of multiple choice questions
and fill-in-the-blank questions.
Prior to the test, you tell your students to study a particular book,
and that the questions asked in the test
will be derived from the information contained in that book.

While the students are preparing by studiously,
you are busy setting the questions too.
You are interested in verifying whether they have covered all the material in the book,
so for each chapter in the book,
you find several pieces of information or concepts
where knowing those would demonstrate an understanding of that chapter.
You then write down a series of questions in one document,
and then the answer for each question in another document.

On the day of the test,
you tell your students to put their books away,
as it is time for the test to begin.
Then you distribute copies of the first document -
with the questions - to each of them,
and ask them to begin answering.
When the students are done,
they hand in their answer sheets,
and which you collect.
You then compare each answer sheet written by the students,
to your second document - the one with the correct answers.
You mark each one as correct or incorrect based on whether
the student had selected the right option amongst multiple choices,
or whether the words that they had filled in the blanks for
matches the allowed set of words for that question.

### Software Testing

An analogous thing happens in software testing.
The creation of the document containing all the questions is writing the tests.
The creation of the document containing all the answers is
writing the assertions or expectations of the tests.
On the day of the test,
the administration of the test,
by distributing the questions,
collecting the answers from the students when they are done,
and then performing the comparisons between the students' answers,
and the expected answers, is what a test runner does.
The students are the program that we wrote, and is referred to as the system under test.

The are two main differences to be aware of.

The first is that the questions (tests) and the answers (assertions/ expectations)
**are co-located**, often in the same file, often in adjacent lines of code.
This is because we can programmatically enforce that our program,
the system under test, does not cheat by peeking at the expected answers,
which is something that we cannot expect of students,
should the teacher distribute the answers alongside the questions!

The second difference is something that makes writing tests for software harder,
and thus is something to give some thought to.
That is - you are both the teacher and the book author at the same time.
You have written the program - the system under test -
and you have also written the tests that verify
that the program is indeed working correctly.
It is human nature to think that our own work is good and therefore correct.
That leaves the door wide open for **bias** towards ones own work to enter,
and quite often it does.
This is why software engineers have coined the terms
**developer hat** and **tester hat**.
It is essentially a strategy where you pretend to be two different people
with two different roles and agendas.
When you are wearing the developer hat,
you should think that the program is awesome,
and your intent is to write code for the program.
When you are wearing the tester hat,
you should think that the same program is problematic,
and your intent is to find flaws with the program.
This is not an easy thing to do,
and is one of the reasons why **writing tests is very hard**!

## Coverage

//TODO

## Badges

Add the following to **README.md**,
preferably immediately after the title:

```markdown
[![Build Status](https://travis-ci.org/GITHUB_NAME/MODULE_NAME.svg?branch=master)](https://travis-ci.org/GITHUB_NAME/MODULE_NAME)
[![Coverage Status](https://coveralls.io/repos/GITHUB_NAME/MODULE_NAME/badge.svg?branch=master)](https://coveralls.io/r/GITHUB_NAME/MODULE_NAME?branch=master)
```

This should render something that looks like the following,
and it is very easy for anyone visiting your project's Github page to,
at a glance, know the current status of your project.

[![Build Status](https://travis-ci.org/bguiz/plugin-registry.svg?branch=master)](https://travis-ci.org/bguiz/plugin-registry)
[![Coverage Status](https://coveralls.io/repos/bguiz/plugin-registry/badge.svg?branch=master)](https://coveralls.io/r/bguiz/plugin-registry?branch=master)

These indicate to developers considering using your project,
that its maintainer cares about the quality of its code -
both in terms of correctness (tests),
and in terms of code coverage.

Doing this therefore, is advertising that the project has these attributes,
and therefore, is likely to be of high quality.

## Contribution Guidelines

Be sure to add a contributing section to **README.md**,
such as this one:

```markdown
## Contributing

This repository uses the
[**git flow** ](http://nvie.com/posts/a-successful-git-branching-model/)
branching strategy.
If you wish to contribute, please branch from the **develop** branch -
pull requests will only be requested if they request merging into the develop branch.
```

The intent of this section should be to lay out any ground rules
for other developers who wish to contribute back to this repository.
Other developers are quite often much more adept at finding bugs in your software,
and finding new ways to use your software,
than you are yourself.
Mostly because there's one of you,
and many of other developers using your software,
so it is a statistical certainty.

In any case, if you put your software up on Github,
and people actually start using it,
you will soon find yourself receiving bug reports and feature requests.
The awesome thing about open source software is that a fraction of these
will come with an accompanying diff-patch which purports to
fix the bug that they have found,
or implement the new feature that they have requested.

In the context of Git and Github,
these will come in the form of "Pull Requests".
This happens when another developer "Forks" your Git repository,
and then makes a new branch off of his forked copy,
when he is happy with the changes that he has made,
he then can notify the owner of the originating Git repository about his branch,
allowing its maintainer to review, comment on,
and copy this branch into his repository, before merging it.
All this can be done either completely via the web user interface on
[github.com](https://github.com),
or it can be done entirely on the command line using `git`,
or somewhere in between.

Thus it is a good idea to provide developers who are users of your project -
and therefore potential contributors back to the project that you maintain -
upfront in your README file with:

- instructions for how to contribute, and
- any ground rules you may have for contributions.

For example, in my projects, where I use the git flow branching strategy,
I use the contributing section to point out that branches and pull requests should
be off the `develop` branch;
because in an absence of this instruction,
the default or assumption would be to branch off `master`.

## Plublicise

After adding:

- continuous integration
- linting
- testing
- code coverage
- badges
- contribution guidelines

... your open source project is now at its prime,
and it is more professional than it has ever been before.
It would be a shame now then, that after all this hard work,
no one knows about it, and no one uses it.

So you should tweet about it, post it on reddit or hacker news, et cetera.
Make sure that someone else knows about it!

The main question is not really about whether you should,
but it is about when you should.
There is no need to post about `v0.0.1`,
the very first iteration, that is more of a proof of concept for yourself,
and you do not really want to publicise.
Instead post about your project when it is reasonably high quality,
and is past the proof of concept stage.
Of course, whenever there is a new release that passes a major milestone,
has a breaking API change, et cetera,
it is time to post about it again.

## Effort

After reading through all that,
it becomes apparent that going through this process is a rather arduous task,
and requires a lot of effort.

There is no denying that.
However, it is a matter of prioritising where to apply the efforts.
One thing that is for certain though,
is that the later these tasks are put off,
larger the effort is to do these things.

One strategy to maintain a balance between active development,
and tasks related to being a good steward of your open source project:

Simply do the minimum to ensure that all of these are in place,
but empty at the get go.
That is, as soon as the project is started,
or as soon as it gets promoted from proof of concept,
to something you wish to publish/ publicise.

At that inception point, set up the `lint task`.
Set up the `test` task, but write just one or two tasks.
Set up the `cover` and `coveralls` tasks, but ignore the fact that coverage is close to zero.

Intersperse active development with writing tests, and fixing lint errors.

Over time, the bugs identified by the tests will get squashed,
and the coverage starts creeping up toward a reasonable threshold.
At this point, we can switch on Travis and Coveralls for this project,
and add the badges to the README.

Even later, you can add the contribution guidelines section to the README,
and post about your project on social to publicise it.

tl;dr= Break up the effort put in, into smaller chunks.

## Not just for maintainers!

Now, all this stuff is not just for maintainers -
you do not even need to have started your own open source project
in order to be a good steward for that project!

The open nature of open source means that anyone can contribute to any project,
so there is nothing stopping you from creating a pull request to add a
`lint` task to a project, nor a `test` task, nor a `cover` task.
Just be sure to ask its maintainer if they are amenable to those first!

const complete = (_, args, context) => context.openai.complete(args)

module.exports = {
  queries: {
    complete
  }
};

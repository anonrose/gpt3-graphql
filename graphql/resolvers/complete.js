const complete = async (_, args, context) => (await context.openai.complete(args.completion_input)).data

module.exports = {
  queries: {
    complete
  }
};

const complete = async (_, args, context) => (await context.openai.complete(args)).data

module.exports = {
  queries: {
    complete
  }
};

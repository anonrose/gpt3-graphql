const search = async (_, args, context) => (await context.openai.search(args)).data

module.exports = {
  queries: {
    search
  }
};

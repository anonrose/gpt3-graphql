const search = (_, args, context) => context.openai.search(args)

module.exports = {
  queries: {
    search
  }
};

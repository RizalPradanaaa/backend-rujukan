import { web } from "./application/web.js";
import { logger } from "./application/logging.js";

web.get("/api", (req, res) => {
  res.status(200).json({
    message: "API is running",
  });
});

web.listen(3000, () => {
  logger.info("App start");
});

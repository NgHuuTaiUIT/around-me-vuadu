declare module "react-gl-transition" {
  import React from "react";

  const GLTransition: React.FC<{
    from: string;
    to: string;
    progress: number;
    transition: any;
  }>;
  export default GLTransition;
}

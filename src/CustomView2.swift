//
//  CustomView2.swift
//
//  Created by codia-figma
//

import SwiftUI

struct CustomView2: View {
    @State public var text2Text: String = "Sign In"
    var body: some View {
        HStack(alignment: .center, spacing: 10) {
            Text(text2Text)
                .foregroundColor(Color(red: 1.00, green: 1.00, blue: 1.00, opacity: 1.00))
                .font(.custom("SFUIText-Regular", size: 32))
                .lineLimit(1)
                .frame(alignment: .center)
                .multilineTextAlignment(.center)
        }
        .padding(EdgeInsets(top: 8, leading: 16, bottom: 8, trailing: 16))
        .frame(width: 149, height: 54, alignment: .top)
        .background(Color(red: 0.00, green: 0.00, blue: 0.00, opacity: 1.00))
        .clipShape(RoundedRectangle(cornerRadius: 6))
    }
}

struct CustomView2_Previews: PreviewProvider {
    static var previews: some View {
        CustomView2()
    }
}
